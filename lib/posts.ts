import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostFrontmatter {
  title: string
  date: string
  category: 'Essay' | 'Breaking News' | 'Personal'
  excerpt: string
  featured?: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  readTime: number
}

export function getAllPosts(lang: 'en' | 'fa' = 'fa'): Post[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter(fileName => fileName.endsWith(`.${lang}.md`))
    .map(fileName => {
      const slug = fileName.replace(new RegExp(`\\.${lang}\\.md$`), '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      // Calculate read time (average 200 words per minute)
      const wordCount = content.split(/\s+/).length
      const readTime = Math.ceil(wordCount / 200)

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
        readTime,
      }
    })

  // Sort posts by date, most recent first
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date)
    const dateB = new Date(b.frontmatter.date)
    return dateB.getTime() - dateA.getTime()
  })
}

export function getPostBySlug(slug: string, lang: 'en' | 'fa' = 'fa'): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.${lang}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
      readTime,
    }
  } catch {
    return null
  }
}

export function getPostsByCategory(category: string, lang: 'en' | 'fa' = 'fa'): Post[] {
  const allPosts = getAllPosts(lang)
  return allPosts.filter(post => post.frontmatter.category === category)
}

export function getFeaturedPost(lang: 'en' | 'fa' = 'fa'): Post | null {
  const allPosts = getAllPosts(lang)
  return allPosts.find(post => post.frontmatter.featured) || allPosts[0] || null
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), 'MMMM d, yyyy')
}

export function getPageContent(pageName: string, lang: 'en' | 'fa' = 'fa'): { content: string; data: Record<string, unknown> } | null {
  try {
    const fullPath = path.join(process.cwd(), 'content/pages', `${pageName}.${lang}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return { content, data }
  } catch {
    return null
  }
}

