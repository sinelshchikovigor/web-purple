import * as React from 'react';

import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import CardMedia from 'material-ui/Card/CardMedia';

import styles from './post.less';

const PostItem = ({ url, title, description, comment, date, author, image }) => (
    <Card className={styles.post}>
        {author && <CardHeader
            title={author.displayName}
            subtitle={(new Date(date)).toLocaleDateString()}
            avatar={author.vkPhotoUrl} />}
        <CardMedia
            className={styles.media}
            overlay={<CardTitle title={title} subtitle={description} />}
            onTouchTap={() => window.open(url, '_blank')}>
            <img src={image} alt={title} />
        </CardMedia>
        {comment && <CardText>{comment}</CardText>}
    </Card>
);

export default PostItem;
