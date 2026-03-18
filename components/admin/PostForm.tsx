"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import type { AdminPost } from "@/lib/content";
import SlugField from "@/components/admin/SlugField";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import AdminSelect from "@/components/admin/AdminSelect";

// --- KONFIGURASI OPSI SELECT ---
const IMAGE_OPTIONS = [
  { value: "url", label: "Gunakan URL gambar" },
  { value: "upload", label: "Upload dari perangkat" },
];

const CATEGORY_OPTIONS = [
  { value: "existing", label: "Pilih kategori tersedia" },
  { value: "new", label: "Buat kategori baru" },
];

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Terbit" },
];

const ALLOWED_REMOTE_HOSTNAMES = new Set([
  "picsum.photos",
  "images.unsplash.com",
  "plus.unsplash.com",
  "images.pexels.com",
]);

function getCoverImageUrlValidationError(value: string): string | null {
  if (/^\/uploads\/[A-Za-z0-9._-]+$/.test(value)) return null;

  try {
    const url = new URL(value);
    if (url.hostname === "unsplash.com") {
      return "Gunakan URL langsung dari images.unsplash.com atau plus.unsplash.com.";
    }
    if (url.hostname === "pexels.com" || url.hostname === "www.pexels.com") {
      return "Gunakan URL langsung dari images.pexels.com (Copy image address), bukan link halaman pexels.com.";
    }
    if (url.protocol !== "https:") {
      return "URL gambar eksternal wajib menggunakan protokol https://.";
    }
    if (!ALLOWED_REMOTE_HOSTNAMES.has(url.hostname)) {
      return "URL gambar tidak valid. Gunakan picsum.photos, images.unsplash.com, plus.unsplash.com, images.pexels.com, atau /uploads/...";
    }
    return null;
  } catch {
    return "Format URL gambar tidak valid.";
  }
}

const postFormSchema = z.object({
  title: z.string().trim().min(1, "Judul wajib diisi."),
  slug: z.string().trim().min(1, "Slug tidak valid."),
  content: z.string().trim().min(1, "Konten wajib diisi."),
  cover_image_url: z
    .string()
    .trim()
    .min(1, "Gambar cover wajib diisi.")
    .superRefine((value, ctx) => {
      const error = getCoverImageUrlValidationError(value);
      if (error) ctx.addIssue({ code: z.ZodIssueCode.custom, message: error });
    }),
  category: z.string().trim().min(1, "Kategori wajib diisi."),
  status: z.enum(["draft", "published"], { message: "Status tidak valid." }),
  published_at: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
      "Format tanggal tidak valid.",
    ),
});

type PostFormErrors = Partial<
  Record<keyof z.infer<typeof postFormSchema>, string>
>;

type PostFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  defaultValues?: Partial<AdminPost>;
  postId?: number;
  categoryOptions?: string[];
};

export default function PostForm({
  action,
  submitLabel,
  defaultValues,
  postId,
  categoryOptions = [],
}: PostFormProps) {
  // --- INISIALISASI TANGGAL ---
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  // --- INISIALISASI KATEGORI ---
  const normalizedCategories = Array.from(
    new Set(categoryOptions.map((c) => c.trim()).filter(Boolean)),
  );
  const hasExistingCategory = normalizedCategories.length > 0;
  const isDefaultCategoryInList = Boolean(
    defaultValues?.category &&
    normalizedCategories.includes(defaultValues.category),
  );

  // --- STATES ---
  const [coverImageUrl, setCoverImageUrl] = useState(
    defaultValues?.cover_image_url ?? "",
  );

  const [imageMode, setImageMode] = useState<"url" | "upload" | "">(
    postId
      ? defaultValues?.cover_image_url?.startsWith("/uploads/")
        ? "upload"
        : "url"
      : "",
  );

  const [status, setStatus] = useState<"draft" | "published" | "">(
    (defaultValues?.status as "draft" | "published") || "",
  );

  const [categoryMode, setCategoryMode] = useState<"existing" | "new" | "">(
    hasExistingCategory
      ? isDefaultCategoryInList
        ? "existing"
        : defaultValues?.category
          ? "new"
          : ""
      : "new",
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    isDefaultCategoryInList ? (defaultValues?.category ?? "") : "",
  );

  const [newCategory, setNewCategory] = useState(
    !isDefaultCategoryInList ? (defaultValues?.category ?? "") : "",
  );

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<PostFormErrors>({});
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, startSubmitting] = useTransition();

  // --- NILAI KOMPUTASI ---
  const finalCategory =
    categoryMode === "existing" ? selectedCategory : newCategory.trim();

  // --- HANDLERS ---
  async function handleImageUpload(file: File) {
    setUploadError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !payload.url)
        throw new Error(payload.error || "Upload failed");

      setImageMode("upload");
      setCoverImageUrl(payload.url);
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? `Gagal upload: ${error.message}`
          : "Gagal upload gambar.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  async function handleClientValidation(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    const formEl = event.currentTarget;

    setIsValidating(true);
    await Promise.resolve();

    const formData = new FormData(formEl);
    const payload = Object.fromEntries(formData.entries());

    const parsed = postFormSchema.safeParse(payload);

    if (parsed.success) {
      setFormErrors({});
      setIsValidating(false);
      startSubmitting(() => void action(new FormData(formEl)));
      return;
    }

    const nextErrors: PostFormErrors = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof PostFormErrors;
      if (!nextErrors[key]) nextErrors[key] = issue.message;
    });

    setFormErrors(nextErrors);
    setIsValidating(false);
  }

  return (
    <Card>
      <CardContent className="p-6 md:p-8">
        <form
          action={action}
          onSubmit={handleClientValidation}
          noValidate
          className="space-y-6"
        >
          {/* Hidden inputs dikirim ke Server Action */}
          {postId && <input type="hidden" name="id" defaultValue={postId} />}
          <input type="hidden" name="status" value={status} />
          <input type="hidden" name="category" value={finalCategory} />

          <SlugField
            defaultTitle={defaultValues?.title}
            label="Judul"
            placeholder="Masukkan judul berita..."
            error={formErrors.title}
          />

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="content">Konten (Markdown)</FieldLabel>
              <Textarea
                id="content"
                name="content"
                rows={12}
                defaultValue={defaultValues?.content}
                required
                className="font-mono bg-transparent dark:bg-input/30"
                placeholder="Tulis konten dalam format Markdown..."
              />
              {formErrors.content && (
                <FieldError>{formErrors.content}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Pilih sumber gambar cover</FieldLabel>
              <AdminSelect
                value={imageMode}
                placeholder="Pilih sumber gambar cover"
                options={IMAGE_OPTIONS}
                onValueChange={(value) =>
                  setImageMode(value as "url" | "upload")
                }
              />

              {imageMode === "url" && (
                <div className="space-y-2">
                  <FieldLabel htmlFor="cover_image_url" className="mt-3">
                    URL gambar cover (paste dari “Copy image address”
                    Unsplash/Pexels)
                  </FieldLabel>
                  <FieldDescription className="text-xs">
                    Gunakan URL langsung dari gambar, misalnya host:
                    picsum.photos, images.unsplash.com, plus.unsplash.com, atau
                    images.pexels.com. Bukan link halaman artikel/foto.
                  </FieldDescription>
                  <Input
                    id="cover_image_url"
                    name="cover_image_url"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    required
                    placeholder="https://images.unsplash.com/... atau https://images.pexels.com/... atau /uploads/namafile.jpg"
                  />
                </div>
              )}

              {imageMode === "upload" && (
                <div className="space-y-2">
                  <FieldLabel htmlFor="cover_image_file" className="mt-3">
                    Upload file gambar
                  </FieldLabel>
                  <Input
                    id="cover_image_file"
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      void handleImageUpload(e.target.files[0])
                    }
                  />
                  <input
                    type="hidden"
                    name="cover_image_url"
                    value={coverImageUrl}
                  />
                  {coverImageUrl && (
                    <FieldDescription className="text-xs">
                      Path hasil upload: {coverImageUrl}
                    </FieldDescription>
                  )}
                </div>
              )}

              {isUploading && (
                <FieldDescription className="text-xs">
                  Sedang mengunggah gambar...
                </FieldDescription>
              )}
              {formErrors.cover_image_url && (
                <FieldError>{formErrors.cover_image_url}</FieldError>
              )}
              {uploadError && <FieldError>{uploadError}</FieldError>}
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field>
                {!hasExistingCategory ? (
                  <>
                    <FieldLabel htmlFor="category_new">Kategori</FieldLabel>
                    <Input
                      id="category_new"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      required
                      placeholder="Strategi Korporasi"
                    />
                  </>
                ) : (
                  <>
                    <FieldLabel>Sumber kategori</FieldLabel>
                    <AdminSelect
                      value={categoryMode}
                      placeholder="Pilih mode kategori"
                      options={CATEGORY_OPTIONS}
                      onValueChange={(value) =>
                        setCategoryMode(value as "existing" | "new")
                      }
                    />

                    {categoryMode === "existing" && (
                      <div className="mt-3">
                        <AdminSelect
                          value={selectedCategory}
                          placeholder="Pilih kategori"
                          options={normalizedCategories.map((c) => ({
                            value: c,
                            label: c,
                          }))}
                          onValueChange={setSelectedCategory}
                        />
                      </div>
                    )}

                    {categoryMode === "new" && (
                      <div className="mt-3">
                        <Input
                          id="category_new"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          required
                          placeholder="Kategori Baru"
                        />
                      </div>
                    )}
                  </>
                )}
                {formErrors.category && (
                  <FieldError>{formErrors.category}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel>Status publikasi</FieldLabel>
                <AdminSelect
                  value={status}
                  placeholder="Pilih status"
                  options={STATUS_OPTIONS}
                  onValueChange={(value) =>
                    setStatus(value as "draft" | "published")
                  }
                />
                {formErrors.status && (
                  <FieldError>{formErrors.status}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="published_at">
                  Tanggal publikasi
                </FieldLabel>
                <Input
                  id="published_at"
                  name="published_at"
                  type="date"
                  defaultValue={defaultValues?.published_at ?? today}
                />
                {formErrors.published_at && (
                  <FieldError>{formErrors.published_at}</FieldError>
                )}
              </Field>
            </div>
          </FieldGroup>

          <div className="pt-4 border-t border-border">
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              disabled={isValidating || isSubmitting}
            >
              {isValidating || isSubmitting ? "Menyimpan..." : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
