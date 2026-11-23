/* ================================================================
   EDITE AQUI: WhatsApp com 55 + DDD, só números.
   ================================================================ */
const WHATSAPP = "5548998565616";

const MENSAGENS = {
  ola: "Olá, Mariana!",
  espera: "Olá, Mariana! Quero entrar na lista de espera das suas próximas obras.",
  tatuagem: "Olá, Mariana! Quero agendar uma tatuagem.\nMinha ideia: \nLocal do corpo: \nTamanho aproximado (cm): \nVou mandar as referências em seguida.",
  trio: "Olá, Mariana! Quero montar um trio da coleção La Vie en Rosé (3 telas por R$ 700).\nAs telas que eu quero (números): \nMeu CEP para o frete: ",
  obra: "Olá, Mariana! Tenho interesse nas obras da coleção La Vie en Rosé.",
  outro: "Olá, Mariana! Queria falar com você sobre: "
};

const zap = msg => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const numeroFormatado = WHATSAPP.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, "+55 ($1) $2-$3");

// Links com data-whats="chave" abrem o WhatsApp com a mensagem pronta.
document.querySelectorAll("[data-whats]").forEach(a => {
  a.href = zap(MENSAGENS[a.dataset.whats] || MENSAGENS.ola);
  a.target = "_blank"; a.rel = "noopener";
});

// Número visível e botões de copiar.
document.querySelectorAll("[data-numero]").forEach(el => { el.textContent = numeroFormatado; });
document.querySelectorAll("[data-copiar]").forEach(btn => {
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(numeroFormatado); btn.textContent = "copiado"; }
    catch (err) {
      const alvo = btn.parentElement.querySelector("[data-numero]");
      if (alvo) { const r = document.createRange(); r.selectNodeContents(alvo); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
    }
  });
});

// Topo: transparente sobre a foto da página inicial; creme nas outras páginas e depois da foto.
const topo = document.getElementById("topo");
const temAbertura = !!document.querySelector(".abertura");
// Fica creme assim que a página começa a rolar, para o letreiro nunca passar por cima do menu.
const ajustaTopo = () => topo.classList.toggle("solido", !temAbertura || window.scrollY > 40);
addEventListener("scroll", ajustaTopo, { passive: true });
addEventListener("resize", ajustaTopo);
ajustaTopo();
