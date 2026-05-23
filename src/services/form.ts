const FORM_ENDPOINT = "https://formsubmit.co/ajax/tizianoluziramos@gmail.com";

export async function sendContactForm(datos: object): Promise<void> {
  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...datos,
      _captcha: "false",
    }),
  });

  if (!response.ok) {
    throw new Error("Error al enviar el formulario");
  }
}