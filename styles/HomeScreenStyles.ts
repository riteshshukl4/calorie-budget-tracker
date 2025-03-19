import { StyleSheet } from 'react-native';
import { lightTheme, darkTheme } from './themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  infoContainer: {
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    width: '100%',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statBlock: {
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    width: '45%',
  },
  statText: {
    fontSize: 16,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addedFoodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  noItemsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    width: '100%',
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSubText: {
    fontSize: 14,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 4,
  },
  customHeader: {
    height: 60,
    backgroundColor: '#6200EE', // Example color, adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export const getDynamicStyles = (isDarkMode: any) => ({
  container: {
    backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background,
  },
  
  infoContainer: {
    backgroundColor: isDarkMode ? darkTheme.card : lightTheme.card,
    borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
  },
  infoText: {
    color: isDarkMode ? darkTheme.text : lightTheme.text,
  },
  infoValue: {
    color: isDarkMode ? darkTheme.text : lightTheme.text,
  },
  statBlock: {
    backgroundColor: isDarkMode ? darkTheme.card : lightTheme.card,
    borderColor: isDarkMode ? darkTheme.border : lightTheme.border,
  },
  statText: {
    color: isDarkMode ? darkTheme.text : lightTheme.text,
  },
  statValue: {
    color: isDarkMode ? darkTheme.text : lightTheme.text,
  },
  addedFoodTitle: {
    color: isDarkMode ? darkTheme.text : lightTheme.text,
  },
  noItemsText: {
    color: isDarkMode ? darkTheme.text : lightTheme.text,
  },
  item: {
    backgroundColor: isDarkMode ? darkTheme.card : lightTheme.card,
    borderBottomColor: isDarkMode ? darkTheme.border : lightTheme.border,
  },
  itemText: {
    color: isDarkMode ? darkTheme.text : lightTheme.text,
  },
  itemSubText: {
    color: isDarkMode ? darkTheme.text : lightTheme.text,
  },
  deleteButton: {
    backgroundColor: darkTheme.danger,
  },
  headerTitle: {
    color: isDarkMode ? '#fff' : '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  customHeader: {
    backgroundColor: isDarkMode ? '#222' : '#ddd',
    padding: 10,
    borderRadius: 5,
  },
});