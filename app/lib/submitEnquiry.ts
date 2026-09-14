export type EnquirySource = "home" | "stay" | "celebrate" | "dine" | "gallery";

type ApiResult = { ok?: boolean; error?: string };

export async function submitEnquiry(form: HTMLFormElement, source: EnquirySource) {
  const formData = new FormData(form);
  const website = String(formData.get("website") ?? "");
  formData.delete("website");
  const fields = Object.fromEntries(
    Array.from(formData.entries(), ([key, value]) => [key, String(value)]),
  );

  const response = await fetch("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source, fields, website }),
  });
  const result = (await response.json().catch(() => null)) as ApiResult | null;

  if (!response.ok || !result?.ok) {
    throw new Error(result?.error || "We could not send your enquiry. Please try again.");
  }
}
