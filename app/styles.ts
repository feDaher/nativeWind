// app/styles.ts
import { StyleSheet } from "react-native";

export const colors = {
  fundo: "#f2f2f2",
  caixa: "#fff",
  borda: "#7D5B8C",
  texto: "#333",
  botao: "#7D5B8C",
};

export const fonts = {
  retro: "PressStart2P_400Regular",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
    justifyContent: "center",  
    alignItems: "center",    
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  caixa: {
    backgroundColor: colors.caixa,
    borderWidth: 3,
    borderColor: colors.borda,
    padding: 20,
    borderRadius: 10,
    width: 320,              
    alignItems: "center", 
    shadowColor: "#000",     
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,           
  },
  title: {
    fontFamily: fonts.retro,
    fontSize: 12,            
    marginBottom: 12,
    lineHeight: 17,
  },
  input: {
    width: "90%",
    borderWidth: 2,
    borderColor: colors.borda,
    borderRadius: 5,
    padding: 8,
    marginVertical: 6,
    fontFamily: fonts.retro,
    textAlign: "center",
    fontSize: 8,           
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: colors.borda,
    borderRadius: 5,
    width: "90%",
    marginVertical: 6,
    overflow: "hidden",
  },
  button: {
    backgroundColor: colors.botao,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 6,
    width: "60%",
  },
  buttonText: {
    color: "#fff",
    fontFamily: fonts.retro,
    textAlign: "center",
    fontSize: 8,           
  },
  resultBox: {
    marginTop: 12,
  },
  resultText: {
    fontFamily: fonts.retro,
    color: colors.texto,
    fontSize: 7, 
    textAlign: "center",
    lineHeight: 17,
  },
  backButton: {
    marginBottom: 12,
    lineHeight: 17,
  },
  backText: {
    fontFamily: fonts.retro,
    fontSize: 10,
    color: colors.borda,
    lineHeight: 17
  },
});
