import { SafeAreaView, ScrollView, ViewProps } from "react-native";
import React from "react";

interface ScreenContainerProps extends ViewProps {
  scrollable?: boolean;
  children: React.ReactNode;
}

export default function ScreenContainer({
  scrollable = false,
  children,
  ...rest
}: ScreenContainerProps) {
  if (scrollable) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 dark:bg-black">
        <ScrollView contentContainerStyle={{ padding: 17 }} {...rest}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center bg-gray-100 dark:bg-black p-6"
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
}
// PARA PADRONIZAR A COR DE FUNDO DA TELA, CENTRALIZAÇÃO E ETC...