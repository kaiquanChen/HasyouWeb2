import Home from '@/components/home/Home'
import About from '@/components/about/About'
import Login from '@/components/login/Login'
import Book from '@/components/book/Book'
import Books from '@/components/book/Books'
import BookAnnual from '@/components/book/Annual'
import BookDetail from '@/components/book/BookDetail'

/* import Read from '@/components/read/Read'
import Music from '@/components/music/Music'
import Forum from '@/components/forum/Forum'
import Movie from '@/components/movie/Movie'
import Kind from '@/components/movie/Kind'
import Event from '@/components/event/Event'
import BookTag from '@/components/book/BookTag'
import BookList from '@/components/book/BookList'
import BookTOP250 from '@/components/book/BookTOP250'
import Post from '@/components/forum/Post'
import GoNode from '@/components/forum/GoNode'
import Node from '@/components/forum/Node'
import MovieDetail from '@/components/movie/MovieDetail'
import MovieList from '@/components/movie/MovieList'
import MovieTOP250 from '@/components/movie/MovieTOP250'
import MovieAnnual from '@/components/movie/Annual'
import Note from '@/components/note/Note'
import NoteDetail from '@/components/note/NoteDetail'
import SearchResult from '@/components/SearchResult'
// user
import Register from '@/components/user/Register'
import Album from '@/components/user/Album'
import User from '@/components/user/User'
import UserNote from '@/components/user/Note'
import UserInfo from '@/components/user/UserInfo'
import UserPassword from '@/components/user/UserPassword'
import UserStep from '@/components/user/UserStep'
// blog
import Blog from '@/components/blog/Blog'
import Blogs from '@/components/blog/Blogs'
import BlogDetail from '@/components/blog/BlogDetail'
import BlogTag from '@/components/blog/BlogTag'
import MyBlog from '@/components/blog/MyBlog'
import WriteBlog from '@/components/blog/WriteBlog'

import Test from '@/components/Test'
*/

export const routes = [
  {
    path: '/', 
    component: Home, 
    children:[
      {path: 'about', component: About},
      {path: 'login', component: Login},
      // book
      {
        path: 'book', 
        component: Book,
        children: [
          {path: 'books', component: Books},
          {path: 'annual/:year', component: BookAnnual},
          {path: ':id', component: BookDetail}
        ]
      },
    ]
  },
  // about
  /* {path: '/read', component: Read},
  {path: '/music', component: Music},
  {path: '/event', component: Event},
  // movie
  {path: '/movie', component: Movie},
  {path: '/movie/tag', component: MovieList},
  {path: '/movie/subject/:id', component: MovieDetail},
  {path: '/movie/top250', component: MovieTOP250},
  {path: '/movie/:type', component: Kind},
  {path: '/movie/annual/:year', component: MovieAnnual},
  // book
  {path: '/book', component: Book},
  {path: '/book/tag', component: BookTag},
  {path: '/book/tag/:tag_id', component: BookList},
  {path: '/book/subject/:id', component: BookDetail},
  {path: '/book/top250', component: BookTOP250},
  {path: '/book/annual/:year', component: BookAnnual},
  // forum
  {path: '/forum', component: Forum},
  {path: '/forum/:id', component: Post},
  {path: '/forum/node/:id', component: GoNode},
  {path: '/forum/go/node', component: Node},
  // note
  {path: '/note', component: Note},
  {path: '/note/subject/:id', component: NoteDetail},
  // search
  {path: '/search', component: SearchResult},
  // user
  {path: '/register', component: Register},
  
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        path: 'note',
        component: UserNote
      },
      {
        path: 'album',
        component: Album
      },
      {
        path: 'info',
        component: UserInfo
      },
      {
        path: 'password',
        component: UserPassword
      },
      {
        path: 'step',
        component: UserStep
      }
    ]
  },
  // blog
  {
    path: '/blog',
    component: Blog,
    children: [
      {
        path: 'latest',
        component: Blogs
      },
      {
        path: ':name',
        component: MyBlog
      },
      {
        path: 'tag',
        component: BlogTag},
      {
        path: ':id/subject',
        component: BlogDetail
      },
      {
        path: ':name/write',
        component: WriteBlog
      }
    ]
  },
  {path: '/test', component: Test} */
]
