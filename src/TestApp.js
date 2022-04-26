import { connect } from 'react-redux'
import React, { Fragment, Component, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Button,
    Text
} from 'react-native';
import { getAllAssesments } from '../src/store/actions/counts'

class TestApp extends Component {
    constructor(props) {
        super(props);
        this.decrementCount = this.decrementCount.bind(this);

    }

    decrementCount() {
        this.props.getAllAssesments()
        console.log('clicked')

    }

    render() {

        const { AssesmentList, searchByAssesmentsLoading } = this.props;
        return (
            <View styles={styles.container}>

                <Text style={styles.textCenter}>{AssesmentList.output}</Text>

                <Button
                    title="load data"
                    onPress={this.decrementCount}
                />

                {searchByAssesmentsLoading ? <ActivityIndicator style={styles.spinnercls} size="small" color="#0000ff" /> : null}

            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center'

    },
    textCenter: {
        textAlign: 'center',
        color: 'green',
        margin: 10

    },
    spinnercls: {
        justifyContent: 'center',
        margin: 10

    }
});


function mapStateToProps(state) {

    return {

        AssesmentList: state.countReducer.AssesmentList,
        searchByAssesmentsLoading: state.countReducer.searchByAssesmentsLoading,

    }

}

export default connect(mapStateToProps, { getAllAssesments })(TestApp)
