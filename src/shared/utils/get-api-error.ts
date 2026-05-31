export function getApiError(error: unknown, fallback: string): string {
  const axiosError = error as { response?: { data?: { message?: string } } };
  return axiosError?.response?.data?.message ?? fallback;
}
