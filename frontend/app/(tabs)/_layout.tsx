import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="products"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-bag" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="cart-plus"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          // headerLeft: () => (
          //   <Link href="/cad_produto" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="plus"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Serviços',
          tabBarIcon: ({ color }) => <TabBarIcon name="shower" color={color} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
