import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Image, ActivityIndicator, RefreshControl, Linking } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import request from '../../request';
import moment from 'moment';
const width = Dimensions.get('window').width;


const NewScreen = () => {
    // States to store the data of the posts and a state to handle the loading
    const [state, setState] = useState({
        data: [],
        loading: false,
    })

    // Fetching the post data 
    const fetchPostsData = async () => {
        setState(() => ({
            loading: true
        }))

        // In order to Get the Post Of New topic we can pass the payload with the key postcategory : 'New' or we can filter the data with the New Category

        const { data } = await request.getPosts();
        if (data) {
            setState(() => ({
                data: data,
                loading: false
            }))
        }
        console.log('home store data', data);

    };

    // For Pull refresh feature
    const onRefresh = useCallback(() => {
        fetchPostsData();
    }, []);


    useEffect(() => {
        fetchPostsData()
    }, [])

    // For list card UI
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => {
            // For the Web view after click on the post 
            Linking.openURL(item?.data?.url_overridden_by_dest);
        }}>
            <View style={{ width: '28%', }}>
                <Image
                    source={{
                        uri: item?.data?.thumbnail ? item?.data?.thumbnail : null,
                    }}
                    style={[styles.img1, {}]}
                    resizeMode={'contain'}
                />
            </View>
            <View style={{ width: '28%', }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width / 1.5 }}>
                    <Text></Text>
                    <Text style={{ color: 'black', fontSize: 12 }}> {moment(item?.data?.created_utc).startOf('hour').fromNow()}</Text>
                </View>
                <Text style={[styles.title, { width: width / 1.5, textAlign: 'left' }]}
                    numberOfLines={2}
                    ellipsizeMode={'tail'}>{item?.data?.title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width / 1.5, marginTop: 10 }}>
                    <Text style={{ color: 'black', fontSize: 12 }}>{item?.data?.author}</Text>
                    <Text style={{ color: 'black', fontSize: 12 }}>Score : {item?.data?.score}</Text>
                    <Text style={{ color: 'black', fontSize: 12 }}>{item?.data?.num_comments} comments</Text>

                </View>
            </View>
        </TouchableOpacity>
    )


    return (
        <View style={{ flex: 1 }}>
            {
                state?.loading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <ActivityIndicator size="large" color={'black'} />
                    </View>
                ) : (
                    // Flatlist to show the list of the post
                    state?.data && (
                        <FlatList
                            data={state?.data?.children}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            refreshControl={
                                <RefreshControl
                                    refreshing={state.loading}
                                    onRefresh={onRefresh}
                                />
                            }
                        />
                    )
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
    },
    card: {
        width: '100%',
        backgroundColor: 'white',
        marginVertical: 7,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        padding: 15,

    },
    img1: {
        width: '100%',
        height: 65,
        alignSelf: 'center',
    },
    title: {
        color: 'black',
        fontSize: 20,
        marginTop: 5,

    },
})

export default NewScreen