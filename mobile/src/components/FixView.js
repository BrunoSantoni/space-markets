import React from 'react'
import { ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native'

export default function FixView(props) {
    return(
        <ScrollView  
            contentContainerStyle={{...styles.childs, ...props.contentContainerStyle}} 
            style={styles.fix}
        >
            <KeyboardAvoidingView style={props.style}>
                {props.children}
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fix: {
        width:'100%',
        height: '100%',
    },

    childs: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})
