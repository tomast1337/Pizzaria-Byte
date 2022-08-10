import * as React from 'react';
import styles from './LandingPageModel.module.scss';

const LandingPageModel = (props: any) => {
    return (
        <div className={styles.landingPage}>
            <div className={styles.logo}>
                <h1>Pizzaria Byte</h1>
            </div>
            <div className={styles.container}>
                {props.children}
            </div>
        </div>
    );
};

export default LandingPageModel;
