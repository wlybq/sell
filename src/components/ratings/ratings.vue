<template>
	<div class="rating" v-el:rating>
		<div class="rating-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :desc="desc" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-show="itemShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar" alt="">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span :class="{'icon-thumb_up':rating.rateType === 0, 'icon-thumb_down':rating.rateType === 1}"></span>
								<span v-for="item in rating.recommend" class="item">{{item}}</span>
							</div>
							<div class="time">{{rating.rateTime | dataFormat}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll";
	import star from "components/star/star";
	import split from "components/split/split";
	import ratingselect from "components/ratingselect/ratingselect";
	import {formatDate} from "common/js/extends.js";

	const POSITVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default {
		props : {
			seller : {
				type : Object
			}
		},
		data() {
			return {
				ratings : [],
    			selectType : ALL,
				onlyContent : true,
    			desc : {
    				all : '全部',
    				positive : '推荐',
    				negative : '吐槽'
    			}
			}
		},
		created() {
			this.$http.get("/api/ratings").then((res) => {
	            this.ratings = res.body.result;
	            this.$nextTick(() => {
	            	this.scroll = new BScroll(this.$els.rating, {
	            		click : true
	            	})
	            });
	        }, (err) => {
	            console.log('err');
	        })
		},
		components : {
			star,
			split,
			ratingselect
		},
    	filters : {
    		dataFormat(time) {
    			let date = new Date(time);
    			return formatDate(date, 'yyyy-MM-dd hh:mm');
    		}
    	},
    	events : {
    		"ratingtype.select"(type) {
    			this.selectType = type;
    			this.$nextTick(() => {
    				this.scroll.refresh();
    			});
    		},
    		"content.toggle"(onlyContent) {
    			this.onlyContent = onlyContent;
    			this.$nextTick(() => {
    				this.scroll.refresh();
    			});
    		}
    	},
    	methods : {
    		itemShow(type, text) {
    			if(this.onlyContent && !text) {
    				return false;
    			}
    			if(this.selectType === ALL) {
    				return true;
    			} else {
    				return type === this.selectType;
    			}
    		}
    	}
	}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
	.rating
		position absolute
		top 174px
		bottom 0px
		left 0px
		width 100%
		overflow hidden
		.overview
			display flex
			padding 18px 0
			.overview-left
				flex 0 0 137px
				padding 6px 0
				width 137px
				border-right 1px solid rgba(7, 17, 27, .1)
				text-align center
				@media only screen and (max-width: 320px)
					flex 0 0 116px
					width 116px
				.score
					margin-bottom 6px
					height 28px
					line-height 28px
					font-size 24px
					color rgb(255, 153, 0)
				.title 
					margin-bottom 8px
					height 12px
					line-height 12px
					font-size 12px
					color rgb(7, 17, 27)
				.rank 
					height 10px
					line-height 10px
					font-size 10px
					color rgb(147, 153, 159)
			.overview-right
				flex 1
				padding 6px 0
				padding-left 24px
				@media only screen and (max-width: 320px)
					padding-left 12px
					.score-wrapper
						.star 
							margin 0 6px !important
					.delivery-wrapper
						.delivery
							margin-left 6px !important
				.score-wrapper
					margin-bottom 8px
					font-size 0
					.title 
						display inline-block
						vertical-align top 
						line-height 18px
						font-size 12px
						color rgb(7, 17, 27)
					.star 
						display inline-block
						vertical-align top 
						margin 0 12px
					.score 
						display inline-block
						vertical-align top 
						line-height 18px
						font-size 12px
						color rgb(255, 153, 0)
				.delivery-wrapper
					font-size 0
					.title 
						display inline-block
						line-height 18px
						font-size 12px
						color rgb(7, 17, 27)
					.delivery
						display inline-block
						margin-left 12px
						line-height 18px
						font-size 12px
						color rgb(147, 153, 159)  
		.rating-wrapper
			padding 0 18px
			.rating-item
				display flex
				padding 18px 0px
				border-1px(rgba(7, 17, 27, .1))
				.avatar
					flex 0 0 28px
					width 28px
					height 28px
					margin-right 12px
					border-radius 50%
					overflow hidden
				.content 
					position relative
					flex 1
					.name 
						margin-bottom 4px
						line-height 12px
						font-size 10px
						color rgb(7, 17, 27)
					.star-wrapper
						margin-bottom 6px
						font-size 0
						.star 
							display inline-block
							margin-right 6px
							vertical-align top
						.delivery
							display inline-block
							vertical-align top
							line-height 12px
							font-size 10px
							color rgb(147, 153, 159)
					.text 
						line-height 18px
						color rgb(7, 17, 27)
						font-size 12px
						margin-bottom 8px
					.recommend
						line-height 16px
						font-size 0
						.icon-thumb_up, .icon-thumb_down, .item
							display inline-block
							margin 0px 8px 4px 0
							font-size 10px
						.icon-thumb_up
							color rgb(0, 160, 220)
						.icon-thumb_down
							color rgb(183, 187, 191)
						.item
							padding 0px 6px
							border 1px solid rgba(7, 17, 27, .1)
							border-radius 1px
							color rgb(147, 153, 159)
							background-color #fff
					.time
						position absolute
						right 0px
						top 0px
						line-height 12px
						font-size 10px
						color rgb(147, 153, 159)
</style>
