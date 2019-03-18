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
import Photo from '@/components/user/Photo'
import UserAlbums from '@/components/user/UserAlbums'
import UserNotes from '@/components/user/UserNotes'
import EditNote from '@/components/user/EditNote'
import NoteDetail from '@/components/user/NoteDetail'

// common
import ItemList from '@/components/common/user/ItemList'

// test
import Test from '@/components/Test'

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
          {path: '', component: UserHome},
          {path: 'subjects/:type', component: ItemList},
          {path: 'album/upload', component: AlbumUpload},
          {path: 'albums', component: UserAlbums},
          {path: 'album/:album_id', component: Photo},
          {path: 'notes', component: UserNotes},
        ]
      },
      {
        path: '/note',
        component: NoteDetail,
        children: []
      },
      {
        path: '/note/subject/:id',
        component: NoteDetail,
        children: []
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
  {path: '/note/edit', component: EditNote},
  {path: '/test', component: Test},
]
