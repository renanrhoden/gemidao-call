import React from 'react';
import { FacebookAds } from 'expo';
import { View } from 'react-native';

const Banner = ({ placementId, styleBanner }) => {
    return (
        <View style={[ styleBanner ]}>
            <FacebookAds.BannerView
                placementId={placementId}
                type="standard"
            />
        </View>
    );
};
export default Banner;