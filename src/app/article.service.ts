import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Article} from './article';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    result: any;

    constructor(private http: HttpClient) {
    }

    getArticles() {
        return this.http.get<Article[]>('/api/all')
            .pipe(
                map(result => this.result = result)
            );
    }

    getArticle(id) {
        return this.http.get<Article>('/api/articles/' + id)
            .pipe(
                map(result => this.result = result)
            );
    }

    insertArticle(post: Article) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const options = {
            headers
        };

        return this.http.post<Article>('/api/create', JSON.stringify(post), options)
            .pipe(
                map(result => this.result = result)
            );
    }

    updateArticle(id, post: Article) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const options = {
            headers
        };

        return this.http.post<Article>('/api/update/' + id, JSON.stringify(post), options)
            .pipe(
                map(result => this.result = result)
            );
    }


    deleteArticle(id) {
        return this.http.get('/api/delete/' + id)
            .pipe(
                map(result => this.result = result)
            );
    }

}
