import { auth, db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import GlobalContext from '../../context/Context';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Chats = () => {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const [userB, setUserB] = useState(null);

  const chatsQuery = query(
    collection(db, 'rooms'),
    where('usersArray', 'array-contains', currentUser.uid)
  );

  const navigation = useNavigation();

  useEffect(() => {
    const logout = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc.data().users.find((user) => {
          console.log(doc.id, '<<<');
          return user.id !== currentUser.uid;
        }),
      }));
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats);
    });
    return () => logout();
  }, []);

  // const getUserB = (currentUser) => {
  //   const userB =
  // }
  console.log(rooms);
  return (
    <View>
      <Navbar />
      {rooms.map((room) => {
        return (
          <View key={room.id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Chat', {
                  userB:
                    room.users[0].id === currentUser.uid
                      ? room.users[1].id
                      : room.users[0].id,
                  room: room,
                })
              }
            >
              <Text key={room.id} room={room}>
                {room.id}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
      <Text>{currentUser.uid}</Text>
    </View>
  );
};

export default Chats;