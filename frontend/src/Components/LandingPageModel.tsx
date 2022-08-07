import * as React from 'react';
import styles from './LandingPageModel.module.scss';

const LandingPageModel = (props: any) => {
    return (
        <>
            <div className={styles.container}>{props.children}</div>
        </>
    );
};

export default LandingPageModel;
