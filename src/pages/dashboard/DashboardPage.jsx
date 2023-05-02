/* eslint-disable */
import { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import Header from "../global/Header";
import './table.css';
import Swal from "sweetalert2";
import { tokens } from "../../theme";
import { Icon } from "@iconify/react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Acessar o banco de dados de entradas e saídas.
  const getLocalStorageEntrada = () => JSON.parse(localStorage.getItem("db_entradas")) ?? [];
  const setLocalStorageEntrada = (addEntrada) => localStorage.setItem("db_entradas", JSON.stringify(addEntrada));
  const getLocalStorageSaida = () => JSON.parse(localStorage.getItem("db_saidas")) ?? [];
  const setLocalStorageSaida = (addSaidas) => localStorage.setItem("db_saidas", JSON.stringify(addSaidas));

  //Ids necessários dos intpus de adcionar valor.
  var inputEntrada = document.getElementById("input-name-entry");
  var inputValorEntrada = document.getElementById("input-value-entry");
  var inputSaida = document.getElementById("input-name-output");
  var inputValorSaida = document.getElementById("input-value-output");

  //Nomes.
  var [nomeCampoEntrada, setNomeCampoEntrada] = useState(undefined);
  var [nomeCampoSaida, setNomeCampoSaida] = useState(undefined);

  //Valores.
  var [valorCampoEntrada, setValorCampoEntrada] = useState(0);
  var [valorCampoSaida, setValorCampoSaida] = useState(0);

  //Listas de entradas e saídas.
  const [camposEntrada, setCamposEntrada] = useState([]);
  const [camposSaida, setCamposSaida] = useState([]);

  //Calcular a renda total no fim do mês.
  var [rendaFimMes, setRendaFimMes] = useState([]);

  //Coletar o nome e o valor dos campos de entradas.
  function setarNomeEntrada(nomeInput){
    setNomeCampoEntrada(
      nomeCampoEntrada = nomeInput.target.value
    );
  };
  function setarValorEntrada(valorInput){
    setValorCampoEntrada(
      valorCampoEntrada = parseFloat(valorInput.target.value)
    );
  };
  
  //Acessar dados do localstorage de entradas e saídas.
  const acessarBancoEntrada = useEffect(()=>{
    setCamposEntrada(getLocalStorageEntrada);
  },[]);

  const acessarBancoSaida = useEffect(()=>{
    setCamposSaida(getLocalStorageSaida);
  },[]);

  //ENTRADAS
  //Adicionar campos na lista de entradas.
  const adicionarCamposEntrada = () => {
    if(nomeCampoEntrada === "" || nomeCampoEntrada === undefined){
          
      if (valorCampoEntrada === 0 || isNaN(valorCampoEntrada)) {
        Swal.fire("Insira um nome e um valor nos campos de entrada!", "", "info")
      } 
      else if (valorCampoEntrada !== 0 || isNaN(valorCampoEntrada) === false){
        Swal.fire("Insira um nome no campo de entrada!", "", "info")
      };
    } 
    else if (nomeCampoEntrada !== "" || nomeCampoEntrada !== undefined){

      if(valorCampoEntrada === 0 || isNaN(valorCampoEntrada)){
        Swal.fire("Insira um valor no campo de entrada.", "", "info")
      } 
      else if (valorCampoEntrada !== 0 || isNaN(valorCampoEntrada) === false){
        const campoEntradaDefault = {
          labelNameEntrada: nomeCampoEntrada,
          valorEntrada: valorCampoEntrada,
          entradaFormatada: valorCampoEntrada.toLocaleString(
            'pt-br',{style:'currency',currency:'BRL'}
          )
        };
        const getDBEntrada = getLocalStorageEntrada();
        getDBEntrada.push(campoEntradaDefault);
        setLocalStorageEntrada(getDBEntrada);
        setCamposEntrada([...camposEntrada, campoEntradaDefault]);
        limparCamposEntrada();
      };
    };
  };

  //Limpar campos de entrada.
  const limparCamposEntrada = () => {
    inputEntrada.value = '';
    inputValorEntrada.value = '';
    setNomeCampoEntrada(nomeCampoEntrada = undefined);
    setValorCampoEntrada(valorCampoEntrada = 0);
  };

  //Deletar campos na lista de entradas.
  const deletarCamposEntrada = (indiceEntrada) => {
    const getDBEntrada = getLocalStorageEntrada();
    getDBEntrada.splice(indiceEntrada, 1);
    setLocalStorageEntrada(getDBEntrada);
    setCamposEntrada(getLocalStorageEntrada);
  };
  const buscarIndiceEntrada = (indiceBotaoDeletar) => {
    const idBotao = indiceBotaoDeletar.target.id;
    deletarCamposEntrada(idBotao);
  };

  //Coletar o nome e o valor dos campos de saídas.
  function setarNomeSaida(nomeInput){
    setNomeCampoSaida(
      nomeCampoSaida = nomeInput.target.value
    );
  };
  function setarValorSaida(valorInput){
    setValorCampoSaida(
      valorCampoSaida = parseFloat(valorInput.target.value)
    );
  };

  //SAÍDAS
  //Adicionar campos na lista de saídas.
  const adicionarCamposSaida = () => {
    if(nomeCampoSaida === "" || nomeCampoSaida === undefined){
      if(valorCampoSaida === 0 || isNaN(valorCampoSaida)){
        Swal.fire("Insira um nome e um valor nos campos de saída!", "", "info")
      } 
      else if (valorCampoSaida !== 0 || isNaN(valorCampoSaida) === false){
        Swal.fire("Insira um nome no campo de saída!", "", "info")
      };
    } 
    else if (nomeCampoSaida !== "" || nomeCampoSaida !== undefined){
      if(valorCampoSaida === 0 || isNaN(valorCampoSaida)){
        Swal.fire("Insira um valor no campo de saída.", "", "info")
      } 
      else if (valorCampoSaida !== 0 || isNaN(valorCampoSaida) === false){
        const campoSaidaDefault = {
          labelNameSaida: nomeCampoSaida,
          valorSaida: valorCampoSaida,
          saidaFormatada: valorCampoSaida.toLocaleString(
            'pt-br',{style:'currency',currency:'BRL'}
          )
        };
        const getDBSaida = getLocalStorageSaida();
        getDBSaida.push(campoSaidaDefault);
        setLocalStorageSaida(getDBSaida);
        setCamposSaida([...camposSaida, campoSaidaDefault]);
        limparCamposSaida();
      };
    };
  };

  //Limpar campos saida.
  const limparCamposSaida = () => {
    inputSaida.value = '';
    inputValorSaida.value = '';
    setNomeCampoSaida(nomeCampoSaida = undefined);
    setValorCampoSaida(valorCampoSaida = 0);
  };

  //Remover campos da lista de saídas.
  const deletarCamposSaida = (indiceSaida) => {
    const getDBSaida = getLocalStorageSaida();
    getDBSaida.splice(indiceSaida,1);
    setLocalStorageSaida(getDBSaida);
    setCamposSaida(getLocalStorageSaida);
  };

  const buscarIndiceSaida = (indiceBotaoSaida) => {
    const idBotao = indiceBotaoSaida.target.id;
    deletarCamposSaida(idBotao);
  };

  //Calcular a renda total no fim do mês.
  const calcularRendaFimMês = useEffect(()=>{
    var totalEntradas = camposEntrada.map(
      itemEntrada => itemEntrada.valorEntrada).reduce(
      (entradaAnt,EntradaAtual)=>entradaAnt + EntradaAtual, 0);
    var totalSaidas = camposSaida.map(
      itemSaida => itemSaida.valorSaida).reduce(
      (saidaAnt,saidaAtual)=>saidaAnt + saidaAtual, 0);
    var rendaTotalFimMes = (totalEntradas - totalSaidas).toLocaleString(
      'pt-br',{style:'currency',currency:'BRL'});
    const atribuirRenda = {
      valorRendaFinal: rendaTotalFimMes
    };
    setRendaFimMes([atribuirRenda]);
  },[camposEntrada,camposSaida]);

  return (
    <Box marginLeft="5px" marginRight="10px" minWidth={330}>
      <Header title="Controle Financeiro" subtitle="Insira Entradas e Saidas Financeiras" />

      <Grid container spacing={1} style={{ borderRadius:"10px", border:"2px ridge", margin:"0px 0px 0px 0px"}} backgroundColor={colors.primary[400]}>
        <Grid item md={5.9} xs={11.8} marginRight={0.2}>
          <Grid container justifyContent="center" backgroundColor="rgb(154, 232, 215)" padding="5px" borderRadius="5px 5px 0px 0px">
            <Typography fontStyle={{color:"rgb(42, 105, 92)"}} variant="h4" sx={{fontWeight: 'bold'}}> Entradas </Typography>
          </Grid>

          <Grid container justifyContent="space-between" backgroundColor="rgb(226, 247, 242)" padding="5px 5px">
            <Typography fontStyle={{color:"rgb(42, 105, 92)"}} variant="h5" sx={{fontWeight: 'bold'}}> Descrição </Typography>
            <Typography fontStyle={{color:"rgb(42, 105, 92)"}} variant="h5" sx={{fontWeight: 'bold'}}> Valor </Typography>
            <Typography fontStyle={{color:"rgb(42, 105, 92)"}} variant="h5" sx={{fontWeight: 'bold'}}> Excluir </Typography>

          </Grid>

          <fieldset className="fieldset-condition" id="fieldset-entry">
            {camposEntrada.length > 0 ? (
              <Box>
                {camposEntrada.map(( propEntrada, id )=>(
                  <div key={ id }>
                  <Grid container justifyContent="space-between" backgroundColor="white" padding="4px 0px 0px 5px">
                    <Typography fontStyle={{color:"rgb(74, 142, 129)"}} variant="h5"> { propEntrada.labelNameEntrada } </Typography>
                    <Typography fontStyle={{color:"rgb(74, 142, 129)"}} variant="h5"> { propEntrada.entradaFormatada }  </Typography>
                    <Typography fontStyle={{color:"rgb(74, 142, 129)"}} variant="h5">
                      {<Icon id={ id } onClick={buscarIndiceEntrada} icon="eva:trash-2-fill" style={{ margin:"0px", height:"20px", width:"30px" }}/> }
                    </Typography>
                  </Grid>
                </div>
                ))}
              </Box>
            ):( <></>)}
          </fieldset>

          <Grid>
            {camposEntrada.length > 0 && (
              <Grid container justifyContent="space-between" backgroundColor="rgb(226, 247, 242)" padding="4px 5px" border="0px 0px 5px 5px">
                <Typography fontStyle={{color:"rgb(74, 142, 129)"}} variant="h5" sx={{fontWeight: 'bold'}}> Total de entradas: </Typography>
                <Typography fontStyle={{color:"rgb(74, 142, 129)"}} variant="h5" sx={{fontWeight: 'bold'}}> 
                  {camposEntrada.map(indiceEntrada => indiceEntrada.valorEntrada).reduce(
                  (prev,curr)=>prev+curr,0).toLocaleString('pt-br',{style:'currency',currency:'BRL'})} 
                </Typography>
              </Grid>
            )}
          </Grid>

          <Grid container justifyContent="space-between" backgroundColor="white" padding="4px 5px" border="0px 0px px 5px" borderRadius="0px 0px 5px 5px">
            <input
              type="text" id="input-name-entry" className="dados-new" placeholder="Descrição"
              onChange={ setarNomeEntrada } autoComplete="off"
            />
            <input type="text" id="input-value-entry" className="dados-new" placeholder="Valor"
              onChange={ setarValorEntrada } autoComplete="off"
            />
            <Button sx={{ fontSize:"13px", fontWeight: 'bold' }} style={{background:"rgb(154, 232, 215)" }} onClick={ adicionarCamposEntrada}>
              Confirmar
            </Button>
          </Grid>
        </Grid>

        <Grid item md={6} xs={11.8} marginRight={0.2}>
          <Grid container justifyContent="center" backgroundColor="rgb(154, 232, 215)" padding="5px" borderRadius="5px 5px 0px 0px">
            <Typography fontStyle={{color:"rgb(42, 105, 92)"}} variant="h4" sx={{fontWeight: 'bold'}}> Saídas </Typography>
          </Grid>

          <Grid container justifyContent="space-between" backgroundColor="rgb(226, 247, 242)" padding="5px 5px">
            <Typography fontStyle={{color:"rgb(42, 105, 92)"}} variant="h5" sx={{fontWeight: 'bold'}}> Descrição </Typography>
            <Typography fontStyle={{color:"rgb(42, 105, 92)"}} variant="h5" sx={{fontWeight: 'bold'}}> Valor </Typography>
            <Typography fontStyle={{color:"rgb(42, 105, 92)"}} variant="h5" sx={{fontWeight: 'bold'}}> Excluir </Typography>

          </Grid>
          
          
          <fieldset className="fieldset-condition" id="fieldset-output">
            {camposSaida.length > 0 ? (
              <Box>
                {camposSaida.map(( propSaida, id )=>(
                  <div key={ id }>
                    <Grid container justifyContent="space-between" backgroundColor="white" padding="4px 0px 0px 5px">
                      <Typography fontStyle={{color:"rgb(74, 142, 129)"}} variant="h5"> { propSaida.labelNameSaida } </Typography>
                      <Typography fontStyle={{color:"rgb(74, 142, 129)"}} variant="h5"> { propSaida.saidaFormatada } </Typography>
                      <Typography fontStyle={{color:"rgb(74, 142, 129)"}} variant="h5">
                        {<Icon id={ id } onClick={buscarIndiceSaida} icon="eva:trash-2-fill" style={{ margin:"0px", height:"20px", width:"30px" }}/> }
                      </Typography>
                    </Grid>
                  </div>
                ))}
              </Box>
            ):( <></>)}
          </fieldset>

          <Grid>
            {camposSaida.length > 0 && (
              <Grid container justifyContent="space-between" backgroundColor="rgb(226, 247, 242)" padding="4px 5px" border="0px 0px 5px 5px">
                <Typography fontStyle={{color:"rgb(74, 142, 129)"}} variant="h5" sx={{fontWeight: 'bold'}}> Total de saídas:</Typography>
                <Typography fontStyle={{color:"rgb(74, 142, 129)"}} variant="h5" sx={{fontWeight: 'bold'}}> 
                  {camposSaida.map(indiceSaida => indiceSaida.valorSaida).reduce(
                    (prev,curr)=>prev+curr,0).toLocaleString('pt-br',{style:'currency',currency:'BRL'})} 
                </Typography>
              </Grid>
            )}
          </Grid>

          <Grid container justifyContent="space-between" backgroundColor="white" padding="4px 5px" border="0px 0px 5px 5px" borderRadius="0px 0px 5px 5px">
            <input
              type="text" id="input-name-output" className="dados-new" placeholder="Descrição"
              onChange={ setarNomeSaida } autoComplete="off"
            />
            <input type="text" id="input-value-output" className="dados-new" placeholder="Valor"
              onChange={ setarValorSaida } autoComplete="off"
            />
            <Button sx={{ fontSize:"13px", fontWeight: 'bold' }} style={{background:"rgb(154, 232, 215)" }} onClick={ adicionarCamposSaida}>
              Confirmar
            </Button>
          </Grid>
        </Grid>

        <Grid item md={12} xs={11.9} marginRight={1} marginBottom={1}>
          {rendaFimMes.map((  propRenda, id )=>(
            <div key={ id }>
              <Grid container justifyContent="center" backgroundColor="rgb(154, 232, 215)" padding="8px" borderRadius="5px">
                <Typography fontStyle={{color:"rgb(42, 105, 92)"}} variant="h4" sx={{fontWeight: 'bold'}}> Saldo Final: {propRenda.valorRendaFinal} </Typography>
              </Grid>
            </div>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;