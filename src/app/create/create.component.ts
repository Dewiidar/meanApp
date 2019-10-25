import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Article} from '../article';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    article: Article;
    articleForm: FormGroup;
    articles: Article[];

    constructor(
        private articleService: ArticleService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.articleService.getArticles().subscribe(
            res => this.articles = res
        );

        this.activatedRoute.params.subscribe(params => {
            if (params.id) {
                this.articleService.getArticle(params.id).subscribe(
                    res => {
                        this.article = res;

                        this.articleForm = this.fb.group({
                            title: [this.article.title, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(45)])],
                            content: [this.article.content, Validators.compose([Validators.required, Validators.minLength(10)])]
                        });
                    }
                );
            } else {

                this.articleForm = this.fb.group({
                    title: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(45)])],
                    content: [null, Validators.compose([Validators.required, Validators.minLength(10)])]
                });

            }
        });
    }

    addArticle(oldArticle, newArticle: Article) {
        if (oldArticle !== undefined) {
            this.articleService.updateArticle(oldArticle._id, newArticle).subscribe(
                updateArticle => {
                    this.router.navigateByUrl('/');
                }
            );
        } else {
            this.articleService.insertArticle(newArticle).subscribe(
                newArticleFromServer => {
                    // ?
                    this.articles.push(newArticleFromServer);
                    this.router.navigateByUrl('/');
                }
            );
        }
    }

}
