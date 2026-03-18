"use client";

import { useState } from "react";
import { slugifyTitle } from "@/lib/slug";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type SlugFieldProps = {
  defaultTitle?: string;
  label?: string;
  placeholder?: string;
  error?: string;
};

export default function SlugField({
  defaultTitle = "",
  label = "Title",
  placeholder = "Enter post title...",
  error,
}: SlugFieldProps) {
  const [title, setTitle] = useState(defaultTitle);
  const slug = slugifyTitle(title);

  return (
    <>
      <Field>
        <FieldLabel htmlFor="title">{label}</FieldLabel>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          placeholder={placeholder}
        />
        {error ? <FieldError>{error}</FieldError> : null}
      </Field>
      <input type="hidden" name="slug" value={slug} />
    </>
  );
}
