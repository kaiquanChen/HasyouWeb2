import Home from '@/components/home/Home'
import About from '@/components/about/About'
import Login from '@/components/login/Login'

// book
import Book from '@/components/book/Book'
import Books from '@/components/book/Books'
import BookDetail from '@/components/book/BookDetail'
import BookTop250 from '@/components/book/BookTop250'
import BookTag from '@/components/book/BookTag'
import BookList from '@/components/book/BookList'
import BookAnnual from '@/components/book/BookAnnual'
import Read from '@/components/book/Read'
import ReadDetail from '@/components/book/ReadDetail'

// movie
import Movie from '@/components/movie/Movie'
import Movies from '@/components/movie/Movies'
import MovieDetail from '@/components/movie/MovieDetail'
import MovieTop250 from '@/components/movie/MovieTop250'
import MovieAnnual from '@/components/movie/MovieAnnual'

// forum
import Forum from '@/components/forum/Forum'
import Forums from '@/components/forum/Forums'
import PostDetail from '@/components/forum/PostDetail'
import GoNode from '@/components/forum/GoNode'

// search
import SearchResult from '@/components/search/SearchResult'

// user
import User from '@/components/user/User'
import AlbumUpload from '@/components/user/AlbumUpload'
import UserHome from '@/components/user/UserHome'

// test
import Test from '@/components/Test'
import FileUpload from '@/components/common/FileUpload'



/* import Read from '@/components/read/Read'
import Music from '@/components/music/Music'
import Movie from '@/components/movie/Movie'
import Kind from '@/components/movie/Kind'
import Event from '@/components/event/Event'
import BookList from '@/components/book/BookList'
import Post from '@/components/forum/Post'
import Node from '@/components/forum/Node'
import MovieList from '@/components/movie/MovieList'
import MovieTOP250 from '@/components/movie/MovieTOP250'
import MovieAnnual from '@/components/movie/Annual'
import Note from '@/components/note/Note'
import NoteDetail from '@/components/note/NoteDetail'
import SearchResult from '@/components/SearchResult'
// user
import Register from '@/components/user/Register'
import Album from '@/components/user/Album'
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
          {path: '', component: Books},
          {path: 'subject/:id', component: BookDetail},
          {path: 'top250', component: BookTop250},
          {path: 'tag', component: BookTag},
          {path: 'tag/:tag_id', component: BookList},
          {path: 'read', component: Read},
          {path: 'read/:id', component: ReadDetail}
        ]
      },
      // movie
      {
        path: 'movie', 
        component: Movie,
        children: [
          {path: '', component: Movies},
          {path: 'subject/:id', component: MovieDetail},
          {path: 'top250', component: MovieTop250}
        ]
      },
      // forum
      {
        path: 'forum', 
        component: Forum,
        children: [
          {path: '', component: Forums},
          {path: 'subject/:id', component: PostDetail},
          {path: 'node/:id', component: GoNode},
        ]
      },
      // user
      {
        path: '/user/:id', 
        component: User,
        children: [
          {path: '', component: UserHome, children: []},
          {path: 'album/upload', component: AlbumUpload,children: []},
        ]
      },
      // search
      {
        path: 'search', 
        component: SearchResult,
        children: []
      }
    ]
  },
  {path: '/movie/annual/:year', component: MovieAnnual},
  {path: '/book/annual/:year', component: BookAnnual},
  {path: '/test', component: FileUpload},
]
