import { useCallback, useContext, useLayoutEffect } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import IconButton from "../components/UI/IconButton"
import { GlobalStyles } from "../constants/styles"
import Button from "../components/UI/Button"
import { ExpensesContext } from "../store/expenses-context"
import ExpenseForm from "../components/manageexpense/ExpenseForm"

function ManageExpense({route, navigation}){
    const expensesCtx = useContext(ExpensesContext)


    const editedExpenseId = route.params?.expenseId
    const isEditing= !!editedExpenseId

    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExpenseId)

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        })

    },[navigation, isEditing])

    function deleteExpenseHandler(){
        navigation.goBack()
        expensesCtx.deleteExpense(editedExpenseId)
    }
    function cancelHandler(){
        navigation.goBack()
    }
    function confirmHandler(expenseData){
        if(isEditing){
            expensesCtx.updateExpense(
            editedExpenseId,
            expenseData)
        }else{
            expensesCtx.addExpense(expenseData)
        }
        navigation.goBack()
    }

return (
<View style={styles.overallContainer}>
  <ExpenseForm 
  submitButtonLabel={isEditing? "Update" : "Add"}
  onCancel={cancelHandler}
  onSubmit={confirmHandler}
  defaultValues={selectedExpense}
  />
  <View style={styles.deleteContainer}>
    {isEditing && <IconButton icon="trash" color={GlobalStyles.colors.error500}  
    size={36}
    onPress={deleteExpenseHandler}
    />} 
  </View>

</View>)
}

export default ManageExpense

const styles = StyleSheet.create({
    deleteContainer:{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary200,
        alignItems:"center"
    },
    overallContainer:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary800
    },
    
})