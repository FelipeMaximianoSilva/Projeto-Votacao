var prompt = require('prompt-sync')();

let votacaoup = 0;

const validacao = {
    negado: 'Negado',
    opcional: 'Opcional',
    obrigatorio: 'Obrigatório',
}

const votos = {
    totalvot: [0, 0, 0, 0, 0, 0],
    candidatos: ['Total', 'Candidato 1', 'Candidato 2', 'Candidato 3', 'Branco', 'Nulo'],
}

function validavoto()
{
    console.log("\nAinda há alguém para votar?\n");
    resposta = prompt().toUpperCase();
    if(resposta == 'SIM' || resposta == 'S')
    {
    }
    else if(resposta == 'NAO' || resposta == 'N' || resposta == 'NÃO')
    {
        votacaoup = 1;
    }
    else
    {
        console.log("\nResposta inválida\n");
        validavoto();
    }
}

function autorizaVoto(anoNascimento)
{
    idade = 2022 - anoNascimento;
    if(idade >= 18 && idade <= 60)
    {
        return validacao.obrigatorio;
    }
    else if(idade < 18 && idade >= 16 || idade > 60 && idade < 120)
    {
        return validacao.opcional;
    }
    else if(idade < 16)
    {
        return validacao.negado;
    }
    else if(idade <= 0 || idade >= 120 || isNaN(idade))
    {
        console.log("A idade inserida não é válida, insira novamente seu ano de nascimento: \n");
        anoNascimento = +prompt();
        autorizaVoto(anoNascimento);
    }
}

function votacao(autorizacao, voto)
{
    if(autorizacao == 'Negado')
    {
        console.log("\nSua idade não é valida para votação!\n");
    }
    else
    {
        if(voto == 1)
        {
            console.log("\nVocê votou no Candidato 1")
            votos.totalvot[1] = votos.totalvot[1] + 1;
        }
        else if(voto == 2)
        {
            console.log("\nVocê votou no Candidato 2");
            votos.totalvot[2] = votos.totalvot[2] + 1;
        }
        else if(voto == 3)
        {
            console.log("\nVocê votou no Candidato 3");
            votos.totalvot[3] = votos.totalvot[3] + 1;
        }
        else if(voto == 4)
        {
            console.log("\nVocê votou em Branco");
            votos.totalvot[4] = votos.totalvot[4] + 1;
        }
        else 
        {
            console.log("\nVocê votou Nulo");
            votos.totalvot[5] = votos.totalvot[5] + 1;
        }
    }
}

function votar()
{
    console.log("\nInsira o seu número para votação, sendo candidatos de 1 a 3, 4 para voto em branco e 5 para voto nulo\n")
    voto = +prompt();
    while(voto < 1 || voto > 5)
    {
        console.log("\nNúmero inválido, insira novamente um número válido para votação!\n");
        voto = +prompt();
    }
    return voto;
}

function exibirResultados()
{
    votos.totalvot[0] = votos.totalvot[1] + votos.totalvot[2] + votos.totalvot[3] + votos.totalvot[4] + votos.totalvot[5];
    console.log(`\nO público votante total foi de ${votos.totalvot[0]} pessoas!\n`);
    console.log(`O ${votos.candidatos[1]} recebeu um total de: ${votos.totalvot[1]} votos!\n`);
    console.log(`O ${votos.candidatos[2]} recebeu um total de: ${votos.totalvot[2]} votos!\n`);
    console.log(`O ${votos.candidatos[3]} recebeu um total de: ${votos.totalvot[3]} votos!\n`);
    console.log(`O total de votos em Branco foi de: ${votos.totalvot[4]} votos!\n`);
    console.log(`O total de votos Nulos foi de: ${votos.totalvot[5]} votos!\n`);
    if(votos.totalvot[1] > votos.totalvot[2] && votos.totalvot[1] > votos.totalvot[3])
    {
        votos.totalvot[1] = votos.totalvot[1] + votos.totalvot[4];
        console.log(`\nO ${votos.candidatos[1]} foi eleito com ${votos.totalvot[1]} votos!`);
    }
    else if(votos.totalvot[2] > votos.totalvot[1] && votos.totalvot[2] > votos.totalvot[3])
    {
        votos.totalvot[2] = votos.totalvot[2] + votos.totalvot[4];
        console.log(`\nO ${votos.candidatos[2]} foi eleito com ${votos.totalvot[2]} votos!`);
    }
    else if(votos.totalvot[3] > votos.totalvot[1] && votos.totalvot[3] > votos.totalvot[2])
    {
        votos.totalvot[3] = votos.totalvot[3] + votos.totalvot[4];
        console.log(`\nO ${votos.candidatos[3]} foi eleito com ${votos.totalvot[3]} votos!`);
    }
    else
    {
        console.log("Houve um empate!");
    }
}

//--------------------------------------------------------------------------------------------------//
//-----------------------------------------------MAIN-----------------------------------------------//
//--------------------------------------------------------------------------------------------------//

console.log("\nVotação para a Eleição do Ano de 2022\n");

while(votacaoup == 0)
{
    console.log("\nInsira seu ano de nascimento para votação: \n");
    anoNascimento = +prompt();
    autorizacao = autorizaVoto(anoNascimento);
    vt = votar();
    votacao(autorizacao, vt);
    validavoto();
}
exibirResultados();