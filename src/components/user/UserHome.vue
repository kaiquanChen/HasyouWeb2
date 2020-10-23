<template>
  <div id="user-items">
        <div class="record-items" v-if="self">
            <h2 class="record album-record">我的相册 · · · · · ·
                <span>(<a :href="gotoUserAlbums()" class="record-count">全部{{albums ? albums.length : 0}}</a>)</span>
            </h2>
            <div class="photos-btn">
                <span class="photos-btn-pic">
                    <a target="_blank" class="lnk-create" :href="gotoAlbumUpload()"><i>+</i>发照片</a>
                </span>
                <span class="photos-btn-pic">
                    <a target="_blank" class="lnk-create-album" :href="gotoAlbumUpload()"><i>+</i>新建相册</a>
                </span>
            </div>
            <ul class="record-items" v-if="albums && albums.length > 0">
                <li class="record-item album" v-for="album in albums" :key="album.id">
                    <div class="album-card" @click="flipToAlbumDetail(album.id)">
                        <img :src="album.first_image_url" alt="card" v-if="album.first_image_url">
                        <img src="/static/icon/photo_album_thumb.png" alt="" v-else>
                    </div>
                    <a class="album-name" target="_blank" :href="gotoAlbumDetail(album.id)">{{album.name}}</a><br>
                    <span class="create-time">{{getDate(album.create_time)}}更新</span>
                </li>
            </ul>
            <ul class="record-items" v-else>你还没有相册，去创建自己的第一个相册吧!</ul>
        </div>
        <!-- <div class="record-items">
            <h2 class="record book-record">我读 · · · · · ·
                <span>(<a :href="gotoItemList('READ_BOOK')" class="record-count">{{getRecordCount(read_books)}}本已读</a>)</span>
            </h2>
            <div class="book-want-read item">
                <div class="item-left book-want-read-left">想读</div>
                <ul class="book-want-read-right record-items" v-if="want_books.body && want_books.body.length > 0">
                    <li class="want-read-item" v-for="want_book in want_books.body" :key="want_book.id">
                        <a target="_blank" :href="gotoBookDetail(want_book.id)"><img :src="want_book.image_url" :alt="want_book.name"></a>
                    </li>
                </ul>
            </div>
            <div class="book-read item">
                <div class="item-left book-read-left">读过</div>
                <ul class="book-read-right record-items" v-if="read_books.body && read_books.body.length > 0">
                    <li class="read-item" v-for="read_book in read_books.body" :key="read_book.id">
                        <a target="_blank" :href="gotoBookDetail(read_book.id)"><img :src="read_book.image_url" :alt="read_book.name"></a>
                    </li>
                </ul>
            </div>
        </div> -->
        <div class="record-items">
            <h2 class="record movie-record">我看 · · · · · ·
            <span>(<a :href="gotoItemList('WATCHED_MOVIE')" class="record-count">{{getRecordCount(watched_movies)}}部已看</a>)</span>
            </h2>
        <!-- <div class="movie-want-read item">
            <div class="item-left movie-want-watch-left">想看</div>
            <ul class="movie-want-read-right record-items" v-if="want_movies && want_movies.body && want_movies.body.length > 0">
                <li class="want-movie-item" v-for="want_movie in want_movies.body" :key="want_movie.id">
                    <a target="_blank" :href="gotoMovieDetail(want_movie.id)"><img :src="want_movie.image_url" :alt="want_movie.name"></a>
                </li>
            </ul>
        </div> -->
        <div class="movie-watched item">
            <div class="item-left movie-watched-left">看过</div>
            <ul class="movie-watched-right record-items" v-if="watched_movies && watched_movies.body && watched_movies.body.length > 0">
                <li class="watched-item" v-for="watched_movie in watched_movies.body" :key="watched_movie.id">
                    <a target="_blank" :href="gotoMovieDetail(watched_movie.id)"><img :src="watched_movie.image_url" :alt="watched_movie.title"></a>
                </li>
            </ul>
        </div>
        </div>
        <div class="record-items" v-if="self">
            <h2 class="record note-record">我的笔记 · · · · · ·
            <span>(<a :href="gotoUserNotes()" class="record-count">共{{getRecordCount(notes)}}条</a>)</span>
            </h2>
            <div class="photos-btn">
                <span class="photos-btn-pic">
                    <a target="_blank" class="lnk-create" href="/note/edit"><i>+</i>写笔记</a>
                </span>
            </div>
            <ul class="record-items" v-if="notes && notes.body && notes.body.length > 0">
                <li class="note-item" v-for="(note, index) in notes.body">
                {{index + 1}} . <a target="_blank" class="note-title" :href="gotoNoteDetail(note.id)">{{note.title}}</a>
                <span class="note-create-time">{{note.create_time}}</span>
                </li>
            </ul>
            <ul class="records-items" v-else>写下笔记，记录学习，生活，工作的脚步!</ul>
        </div>
  </div> 
</template>

<script>
    import global_ from "../config/Global";

    const book_record_url = global_.URLS.BOOK_RECORD_URL;
    const movie_record_url = global_.URLS.MOVIE_RECORD_URL;
    const note_url = global_.URLS.NOTE_URL;
    const user_album_url = global_.URLS.USER_ALBUM_URL;
    export default {
      name: "book",
      props: ["user"],
      data() {
        return {
            read_books: null,
            want_books: null,
            watched_movies: null,
            want_movies: null,
            albums: null,
            notes: null,
            blogs: null,
            token: null,
            self: null
        };
      },
      methods: {
        gotoNoteDetail(id) {
            return "/note/subject/" + id;
        },
        gotoUserNotes() {
            return "/user/" + this.user.id + "/notes";
        },
        gotoItemList(type) {
            return "/user/" + this.user.uid + "/subjects/" + type;
        },
        flipToAlbumDetail(id) {
            this.$router.push({path: "/user/" + this.user.id + "/album/" + id});
        },
        gotoAlbumDetail(id) {
            return "/user/" + this.user.id + "/album/" + id;
        },
        gotoUserAlbums() {
            return "/user/" + this.user.id + "/albums";
        },
        getDate(time) {
            return time.split(" ")[0];
        },
        gotoAlbumUpload() {
            return "/user/" + this.user.id + "/album/upload";
        },
        gotoBookDetail(id) {
            return "/book/subject/" + id;
        },
        gotoMovieDetail(id) {
            return "/movie/subject/" + id;
        },
        getRecordCount(list) {
            if (list) {
                return list.total;
            } else {
                return 0;
            }
        },
        getBookRecords(type) {
            this.$http.get(book_record_url, {
                params: {
                    type: type,
                    count: 5
                },
                headers:{
                    "bid": global_.FUNC.getBid(),
                    "X-HASYOU-TOKEN": this.token
                }
            }).then((data) => {
                if (type === "READ_BOOK") {
                    this.read_books = data.body.data;
                } else if (type === "WANT_READ") {
                    this.want_books = data.body.data;
                }
            });
        },
        getMovieRecords(type) {
            this.$http.get(movie_record_url, {
                params: {
                    type: type,
                    page_size: 5,
                    uid: this.user.uid
                },
                headers:{
                    "bid": global_.FUNC.getBid(),
                    "X-HASYOU-TOKEN": this.token
                }
            }).then((data) => {
                if (type === "WATCHED_MOVIE") {
                    this.watched_movies = data.body.data;
                } else if (type === "WANT_WATCH") {
                    this.want_movies = data.body.data;
                }
            });
        },
        getNotes() {
            this.$http.get(note_url + "subjects", {
                params: {
                    type: "NOTE",
                    count: 5
                },
                headers:{
                    "bid": global_.FUNC.getBid(),
                    "X-HASYOU-TOKEN": this.token
                }
            }).then((data) => {
                this.notes = data.body.data;
            });
        },
        getAlbums() {
            this.$http.get(user_album_url, {
                headers: {
                    "bid":global_.FUNC.getBid(),
                    "X-HASYOU-TOKEN": this.token
                }
            }).then(data => {
                this.albums = data.body.data;
            });
        },
        initToken() {
            this.token = localStorage.getItem("access_token");
        }
      },
      created() {
          this.initToken();
          this.getAlbums();
        //   this.getBookRecords("READ_BOOK");
        //   this.getBookRecords("WANT_READ");
          this.getMovieRecords("WATCHED_MOVIE");
        //   this.getMovieRecords("WANT_WATCH");
          this.getNotes();
      }
    }
</script>

<style lang="scss" scoped>
    @import './css/userHome.scss'
</style>
