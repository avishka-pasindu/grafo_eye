import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'

export default function TextInput({ errorText, description, ...props }) {

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        // onFocus={()=>backgroundColor: 'green'}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.primary,
    height: 50

  },
  description: {
    fontSize: 12,
    color: theme.colors.primary,
    paddingTop: 6,
  },
  error: {
    fontSize: 12,
    color: theme.colors.error,
    paddingTop: 6,
  },
})
