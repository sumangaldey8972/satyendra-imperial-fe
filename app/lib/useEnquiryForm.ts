"use client";

import { FormEvent, useState } from "react";
import { EnquirySource, submitEnquiry } from "./submitEnquiry";

export function useEnquiryForm(source: EnquirySource) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitEnquiry(form, source);
      setSubmitted(true);
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetSubmission() {
    setSubmitted(false);
    setSubmitError("");
    setSubmitting(false);
  }

  return { submitted, submitting, submitError, handleSubmit, resetSubmission };
}
