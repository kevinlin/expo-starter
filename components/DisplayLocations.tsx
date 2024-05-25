import {gql, useQuery} from "@apollo/client";
import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import {ScrollView} from "react-native-gesture-handler";

const GET_LOCATIONS = gql`
    query GetLocations {
        locations {
            id
            name
            description
            photo
        }
    }
`;

const LocationItem = ({name, description, photo}) => (
    <View style={styles.itemContainer}>
        <Text style={styles.title}>{name}</Text>
        <Image style={styles.image} source={{uri: photo}}/>
        <Text style={styles.boldText}>About this location:</Text>
        <Text>{description}</Text>
    </View>
);

export function DisplayLocations() {
    const {loading, error, data} = useQuery(GET_LOCATIONS);

    if (loading) return <Text style={styles.message}>Loading...</Text>;
    if (error) return <Text style={styles.message}>Error: {error.message}</Text>;

    console.log(`data: ${JSON.stringify(data, null, 2)}`);

    return (
        <ScrollView>
            <FlatList
                data={data.locations}
                renderItem={({item, index}) => (
                    <LocationItem
                        name={item.name}
                        description={item.description}
                        photo={item.photo}
                    />
                )}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    message: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16
    },
    itemContainer: {
        marginBottom: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    image: {
        width: 400,
        height: 250,
        resizeMode: 'cover',
        marginVertical: 10
    },
    boldText: {
        fontWeight: 'bold'
    }
});
