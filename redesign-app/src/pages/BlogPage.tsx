import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { postsFor } from '../blog';
import { Section, PageHero } from '../components/ui/sections';

const PAGE_SIZE = 9;
const COVERS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

export function BlogPage() {
  const { t, lang } = useI18n();
  const posts = postsFor(lang);
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = posts.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const go = (next: number) => {
    setPage(Math.min(pageCount, Math.max(1, next)));
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <PageHero prefix="blog" />

      <Section padTop={64}>
        <div className="blog-grid">
          {visible.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="blog-card reveal"
            >
              <div className={`blog-cover ${COVERS[(index + (current - 1) * PAGE_SIZE) % COVERS.length]}`}>
                <div className="cover-art">{post.category.slice(0, 2)}</div>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span className="blog-cat">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        {pageCount > 1 && (
          <div className="blog-pager">
            <button type="button" className="btn btn-secondary btn-sm" disabled={current === 1} onClick={() => go(current - 1)}>
              {t('blog.pager.prev')}
            </button>
            {Array.from({ length: pageCount }, (_, n) => n + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={`btn btn-sm ${n === current ? 'btn-primary' : 'btn-secondary'}`}
                aria-current={n === current ? 'page' : undefined}
                onClick={() => go(n)}
              >
                {n}
              </button>
            ))}
            <button type="button" className="btn btn-secondary btn-sm" disabled={current === pageCount} onClick={() => go(current + 1)}>
              {t('blog.pager.next')}
            </button>
          </div>
        )}
      </Section>
    </>
  );
}
