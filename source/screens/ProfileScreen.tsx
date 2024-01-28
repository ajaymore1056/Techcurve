import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import ProfileSVG from "../assests/ProfileSVG";
import { CustomLoader } from "../components/CustomLoader";
import CustomText from "../components/CustomText";
import { BLACK, WHITE } from "../constant/Color";

const ProfileScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [loader, setLoader] = useState(false);
    const registerUserData = useSelector((state: any) => state.counter.registerUserData);
    useEffect(() => {
        setTimeout(() => {
            setLoader(true)
        }, 1000);
    }, [])
    const handleRefresh = async () => {
        try {
            setRefreshing(true);
            setRefreshing(false);
        } catch (error: any) {
            console.log(error)
        }
    };
    const renterItem = ({ item, index }: any) => {
        return (
            <View style={styles.cardStyle} key={index}>
                <View style={styles.profileView}>
                    <ProfileSVG width={50} height={50} />
                </View>
                <View style={styles.textView}>
                    <CustomText style={styles.mainText} numberOfLines={1}>{item?.name}</CustomText>
                    <CustomText style={styles.secondaryText} numberOfLines={1}>{item?.role}</CustomText>
                    <CustomText style={styles.secondaryText} numberOfLines={1}>{item?.email}</CustomText>
                </View>
            </View>
        )
    }
    const handleLoadMore = () => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 2000);
    }
    return (
        <SafeAreaView style={styles.container}>
            {loader ? <FlatList
                keyboardShouldPersistTaps="handled"
                data={registerUserData}
                renderItem={renterItem}
                keyExtractor={(Item: any, index: any) => Item?.email + index}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                initialNumToRender={12}
            />
                :
                <CustomLoader />
            }
        </SafeAreaView>
    )
}
export default ProfileScreen;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        paddingTop: 10
    },
    cardStyle: {
        elevation: 5,
        backgroundColor: WHITE,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 10,
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    },
    profileView: {
        backgroundColor: '#E0E0E0',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BLACK
    },
    secondaryText: {
        fontSize: 16,
        fontWeight: '400',
        color: BLACK
    },
    textView: {
        width: '70%'
    }
})