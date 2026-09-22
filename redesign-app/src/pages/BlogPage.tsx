import { useI18n } from '../i18n';
import { Icon, type IconName } from '../components/Icon';
import { Section, PageHero } from '../components/ui/sections';

export function BlogPage() {
  const { t, ta } = useI18n();
  const posts = ta<{ cover: string; icon: IconName; cat: string; date: string; title: string; desc: string }>(
    'blog.posts'
  );

  return (
    <>
      <PageHero prefix="blog" />

      <Section padTop={64}>
        <div className="blog-grid">
          {posts.map((post) => (
            <a
              key={post.title}
              href="#"
              className="blog-card reveal"
              onClick={(e) => e.preventDefault()}
            >
              <div className={`blog-cover ${post.cover}`}>
                <div className="cover-art">
                  <Icon name={post.icon} />
                </div>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span className="blog-cat">{post.cat}</span>
                  <span>{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="blog-pager">
          <a href="#" className="btn btn-secondary btn-sm" onClick={(e) => e.preventDefault()}>
            {t('blog.pager.prev')}
          </a>
          {[1, 2, 3].map((n) => (
            <a
              key={n}
              href="#"
              className={`btn btn-sm ${n === 1 ? 'btn-primary' : 'btn-secondary'}`}
              onClick={(e) => e.preventDefault()}
            >
              {n}
            </a>
          ))}
          <a href="#" className="btn btn-secondary btn-sm" onClick={(e) => e.preventDefault()}>
            …
          </a>
          <a href="#" className="btn btn-secondary btn-sm" onClick={(e) => e.preventDefault()}>
            13
          </a>
          <a href="#" className="btn btn-secondary btn-sm" onClick={(e) => e.preventDefault()}>
            {t('blog.pager.next')}
          </a>
        </div>
      </Section>
    </>
  );
}
