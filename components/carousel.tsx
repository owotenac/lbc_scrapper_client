import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useSharedValue } from "react-native-reanimated";

import React from 'react';
import Carousel, {
    ICarouselInstance,
    Pagination
} from "react-native-reanimated-carousel";

const width = 400//Dimensions.get("window").width;

type CarouselImageProps = {
    images: string[]
}

const CarouselImage = ({ images }: CarouselImageProps) => {

    const data = images

    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };

    return (
        <View style={{}}>
            <Carousel
                ref={ref}
                style={{ width, height: width * 0.6 }}
                width={width}
                data={data}
                onProgressChange={progress}
                renderItem={({ item }: { item: string }) => (

                    <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />

                )}
            />

            <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={{ backgroundColor: "rgb(247, 244, 244)", borderRadius: 50 }}
                containerStyle={{ gap: 5, marginTop: 10, marginBottom: 10 }}
                onPress={onPressPagination}
            />
        </View>
    )
}

export default CarouselImage

const styles = StyleSheet.create({
    image: {
        width: width,
        height: width * 0.6,
    }
})