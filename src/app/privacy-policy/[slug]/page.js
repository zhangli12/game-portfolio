import { getPrivacyPolicyBySlug } from '@/api';
import markdownToHtml from '@/api/markdown';

async function getPolicy(slug) {
  const policy = getPrivacyPolicyBySlug(slug);
  const content = await markdownToHtml(policy.content || '');
  return {
    ...policy,
    content,
  };
}

export default async function PrivacyPolicyDetails({ params }) {
  const { slug } = await params;
  const policy = await getPolicy(slug);

  return (
    <div className="container mx-auto px-12 py-10 max-w-7xl space-y-12 text-white">
      <p>Last Updated: {policy.date}</p>
      <h1 className="text-5xl font-extrabold text-center">{policy.title}</h1>

      {/* Content Section */}
      <section className="space-y-6  max-w-6xl">
        {/* <h2 className="text-3xl font-semibold">Description</h2> */}
        <article
          className="prose prose-invert prose-lg mx-auto w-full max-w-6xl"
          dangerouslySetInnerHTML={{ __html: policy.content }}
        />
      </section>
    </div>
  );
}
