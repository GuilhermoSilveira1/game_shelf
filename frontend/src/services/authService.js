import { BACKEND_API } from "@/config/api";

async function readResponse(res) {
  const contentType = res.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return res.json();
  }

  return null;
}

export async function login(data) {
  const res = await fetch(`${BACKEND_API}/auth`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await readResponse(res);

  if (!res.ok) {
    throw new Error(
      responseData?.mensagem ||
        responseData?.message ||
        "Erro no login"
    );
  }

  return responseData;
}

export async function register(data) {
  const res = await fetch(`${BACKEND_API}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await readResponse(res);

  if (!res.ok) {
    throw new Error(
      responseData?.mensagem ||
        responseData?.message ||
        "Erro no registro"
    );
  }

  return responseData;
}

export async function logout() {
  const res = await fetch(`${BACKEND_API}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const responseData = await readResponse(res);

  if (!res.ok) {
    throw new Error(
      responseData?.mensagem ||
        responseData?.message ||
        "Erro ao realizar logout"
    );
  }

  return responseData;
}