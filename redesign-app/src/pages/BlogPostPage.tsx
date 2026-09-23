import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { loadPost, postsFor, type BlogPost } from '../blog';
import { Markdown } from '../markdown';
import { Section } from '../components/ui/sections';

export function BlogPostPage() {
  const { slug = '' } = useParams();
  const { t, lang } = useI18n();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
  const more = postsFor(lang).filter((item) => item.slug !== slug).slice(0, 3);

  useEffect(() => {
    let alive = true;
    setPost(undefined);
    loadPost(slug).then((found) => {
      if (alive) setPost(found);
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (post === undefined) return null;

  if (!post) {
    return (
      <Section small>
        <div className="post-missing">
          <h1>{t('blog.missing')}</h1>
          <Link to="/blog" className="btn btn-primary">
            {t('blog.back')}
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <>
      <section className="phero">
        <div className="container post-hero">
          <Link to="/blog" className="post-back">
            {t('blog.back')}
          </Link>
          <div className="blog-meta">
            <span className="blog-cat">{post.category}</span>
            <span>{post.date}</span>
          </div>
          <h1>{post.title}</h1>
          <p className="phero-sub">{post.excerpt}</p>
        </div>
      </section>
      <Section small>
        <article className="post">
          <Markdown source={post.body} />
        </article>
        {more.length > 0 && (
          <div className="post-more">
            <h2>{t('blog.more')}</h2>
            <div className="blog-grid">
              {more.map((item) => (
                <Link key={item.slug} to={`/blog/${item.slug}`} className="blog-card">
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span className="blog-cat">{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
