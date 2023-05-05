import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Image, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import request from '../../request';
import moment from 'moment/moment';
const width = Dimensions.get('window').width;


const TopScreen = () => {
    const [state, setState] = useState({
        data: [],
        loading: false,
    })

    const fetchPostsData = async () => {
        setState(() => ({
            loading: true
        }))

        // In order to Get the Post Of Top topic we can pass the payload with the key postcategory : 'Top' or we can filter the data with the Top Category

        const { data } = await request.getPosts();
        if (data) {
            setState(() => ({
                data: data,
                loading: false
            }))
        }
        console.log('home store data', data);

    };

    const onRefresh = useCallback(() => {
        fetchPostsData();
    }, []);


    useEffect(() => {
        fetchPostsData()
    }, [])

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
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
        <View style={{}}>
            {
                state?.loading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color={'black'} />
                    </View>
                ) : (

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
        alignItems: 'flex-start',
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

export default TopScreen