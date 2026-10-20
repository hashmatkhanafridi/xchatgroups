import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Grupos XChat: encontre links e verifique convites';
const description = 'Encontre links de grupos XChat por categoria, saiba como conferir um convite no X e veja o que fazer quando um link não abrir.';
const url = 'https://www.xchatgroups.chat/pt/grupos-xchat';
const englishUrl = 'https://www.xchatgroups.chat/guides/xchat-group-links';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
    languages: {
      'en': englishUrl,
      'pt-BR': url,
      'x-default': englishUrl,
    },
  },
  openGraph: { title, description, url, type: 'article', locale: 'pt_BR' },
};

export default function GruposXChatGuide() {
  return (
    <article lang="pt-BR" className="container mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <nav aria-label="Navegação estrutural" className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="text-primary hover:underline">Início</Link> / Guia de grupos XChat
      </nav>
      <p className="mb-5 text-sm text-muted-foreground">
        <Link href="/guides/xchat-group-links" hrefLang="en" className="text-primary hover:underline">Read this guide in English</Link>
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold mb-5">Grupos XChat: encontre links e confira os convites</h1>
      <p className="text-lg text-muted-foreground leading-relaxed">Este é um diretório independente de comunidades enviadas por usuários. Você pode procurar grupos XChat por assunto e abrir a página de cada grupo antes de seguir o convite para o X. A decisão de aceitar novos participantes pertence ao responsável pelo grupo.</p>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-2xl font-bold">Como encontrar um grupo XChat</h2>
        <ol className="list-decimal pl-5 space-y-3">
          <li>Acesse a <Link href="/#categories" className="text-primary underline">lista de categorias</Link> e escolha um assunto.</li>
          <li>Abra a página do grupo e leia a descrição para entender o tema e o público.</li>
          <li>Ao seguir o convite, confirme no X se o nome e as informações correspondem ao grupo esperado.</li>
        </ol>
        <p>Os convites podem mudar, expirar ou ter requisitos de entrada. Uma página neste diretório não garante acesso, atividade recente ou aprovação pelo X.</p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-2xl font-bold">O que fazer quando um convite não abre</h2>
        <p>Uma tela de login, sozinha, não confirma se o convite funciona. Se você optar por entrar na conta, use apenas o aplicativo oficial ou o site x.com e tente novamente pelo link original.</p>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>O link parece incompleto:</strong> compare-o com o convite publicado pelo responsável do grupo.</li>
          <li><strong>O link abre uma notícia ou publicação:</strong> esse conteúdo pode mencionar o grupo sem ser o convite.</li>
          <li><strong>O X informa que o convite não está disponível:</strong> peça ao responsável um link atual.</li>
          <li><strong>O destino mostra outro grupo:</strong> não prossiga e <Link href="/contact" className="text-primary underline">informe o problema</Link> com a URL da página.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-2xl font-bold">Antes de participar</h2>
        <p>Leia as regras mostradas pelo grupo e evite compartilhar senhas, códigos de verificação ou dados pessoais sensíveis. As descrições podem ficar desatualizadas; use a página de contato para enviar uma correção.</p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-2xl font-bold">Envie um grupo para o diretório</h2>
        <p>Use o <Link href="/submit" className="text-primary underline">formulário de envio</Link> com um convite atual, um nome claro, a categoria mais próxima e uma descrição objetiva. Envie o link apenas se você tiver permissão para divulgá-lo publicamente. As submissões passam por análise antes da publicação.</p>
      </section>

      <Link href="/#categories" className="inline-block mt-10 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground">Ver categorias de grupos XChat</Link>
    </article>
  );
}
