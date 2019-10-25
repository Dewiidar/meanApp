import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../article.service';
import {Article} from '../article';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    articles: Article[];

    constructor(private articleService: ArticleService) {
    }

    ngOnInit() {
        this.articleService.getArticles().subscribe(res => {
            this.articles = res;
        });
    }


}
