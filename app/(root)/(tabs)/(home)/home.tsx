import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '@/components/global/button/CustomButton'
import { signOut } from '@/store/features/auth/authSlice'
import { useDispatch } from 'react-redux'

const Home = () => {
    const dispatch = useDispatch();
  return (

    <View>
      <Text>Home</Text>
          <CustomButton
              title='Sign out'
              onPress={()=>{
                  dispatch(signOut());
              }}
              className="mb-4 mt-[18px] !rounded !text-white"
          />
    </View>
  )
}

export default Home
