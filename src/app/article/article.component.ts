import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../article.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Article} from '../article';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
    article: Article;

    constructor(
        private articleService: ArticleService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                const id = params.id;

                this.articleService.getArticle(id)
                    .subscribe(
                        res => this.article = res
                    );
            }
        );
    }

    deleteArticle(articleId) {
        this.articleService.deleteArticle(articleId).subscribe(
            res => {
                this.router.navigateByUrl('/');
            }
        );
    }

}
