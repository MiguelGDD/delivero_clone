import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity'
import {
  ArrowLeftIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from 'react-native-heroicons/solid'
import { ChevronRightIcon } from 'react-native-heroicons/outline'
import DishRows from '../components/DishRows'
import BasketIcon from '../components/BasketIcon'
import { useDispatch } from 'react-redux'
import { setRestaurant } from '../features/restaurantSlice'

const RestaurantScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      last,
    },
  } = useRoute()

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        last,
      })
    )
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  console.log(dishes)

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className='relative'>
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className='w-full h-56 bg-gray-300 p-4'
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className='absolute top-10 left-5 p-2 bg-gray-100 rounded-full'
          >
            <ArrowLeftIcon size={20} />
          </TouchableOpacity>
        </View>
        <View className='bg-white'>
          <View className='px-4 pt-4'>
            <Text className='text-3xl font-bold'>{title}</Text>
            <View className='flex-row space-x-2 my-1'>
              <View className='flex-row items-center space-x-1'>
                <StarIcon opacity={22} size={22} />
                <Text className='text-xs text-gray-500'>
                  <Text className='text-green-500'>{rating}</Text> • {genre}
                </Text>
              </View>
              <View className='flex-row items-center space-x-1'>
                <MapPinIcon opacity={22} size={22} />
                <Text className='text-xs text-gray-500'>
                  <Text className='text-green-500'>Nearby • {address}</Text>
                </Text>
              </View>
            </View>
            <Text className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
          </View>

          <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
            <QuestionMarkCircleIcon opacity={0.6} size={20} />
            <Text className='pl-2 flex-1  text-md font-bold'>
              Have a food allergy?
            </Text>
            <ChevronRightIcon />
          </TouchableOpacity>
        </View>
        <View className='pb-36'>
          <Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>
          {dishes?.map((item) => (
            <DishRows
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.short_description}
              price={item.price}
              image={item.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  )
}

export default RestaurantScreen
