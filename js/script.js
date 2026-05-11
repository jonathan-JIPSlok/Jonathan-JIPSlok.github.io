/*******************************************************************************************
 * Obejtivo: adicionar projetos direto no index a partir de dados de um JSON
 * Autor: Jonathan Yuri Poli Siqueira
 * Data: 10/05/2026
 * Versão: 2.0 Beta
 *******************************************************************************************/

import { JsonArray } from "../data/JsonProjects.js";

// pega cada projeto do array e envia para outra função
const getProjectsForArray = function (array, funcaoDestino) {
    array.forEach(projeto => {
        funcaoDestino(projeto);
    });
}

// Pega um projeto do array via id
const getProjectById = function (array, id) {
    let projeto = array.find(obj => obj.id === id);
    return projeto
}

// Cria os cards no html contendo os projetos
const createCardProject = function (project) {
    let sectionProjects = document.getElementById("sectionProjetos");

    //Criando elementos
    let divCard = document.createElement("div");
    let h3Projeto = document.createElement("h3");
    let divVideoProjeto = document.createElement("div");
    let pDescricaoProjeto = document.createElement("p");
    let buttonSaibaMais = document.createElement("button");
    let iframe;

    
    if (project.videoPitch != null) {
        iframe = document.createElement("iframe");
        iframe.setAttribute("src", project.videoPitch);
        iframe.setAttribute("title", project.titulo);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    } else {
        iframe = document.createElement("div");
    }
    //Adcionando atributos aos elementos criados
    divCard.setAttribute("class", "divCard");
    h3Projeto.setAttribute('class', 'h3Projeto');
    divVideoProjeto.setAttribute("class", "divVideoProjeto");
    pDescricaoProjeto.setAttribute("class", "pDescricaoProjeto");
    buttonSaibaMais.setAttribute("class", "buttonSaibaMaisProjeto");
    buttonSaibaMais.setAttribute("id", project.id)

    //Adicionando texto
    h3Projeto.innerText = project.titulo
    pDescricaoProjeto.innerText = project.descricao
    buttonSaibaMais.innerText = "saiba mais"

    // Adiciona funcionalidade ao botão
    buttonSaibaMais.addEventListener('click', function () {
        createOverlayProject(buttonSaibaMais.id)
    })

    // Adiciona os novos elementos ao HTML
    divCard.appendChild(h3Projeto);
    divVideoProjeto.appendChild(iframe);
    divCard.appendChild(divVideoProjeto);
    divCard.appendChild(pDescricaoProjeto);
    divCard.appendChild(buttonSaibaMais);
    sectionProjects.appendChild(divCard);
}

const createOverlayProject = function (id) {
    let project = getProjectById(JsonArray, id)
    
    // Cria os elementos
    let sectionOverlay = document.createElement('section')
    let divOverlay = document.createElement('div')
    let h3Titulo = document.createElement('h3')
    let pConteudo = document.createElement('p')
    let buttonVoltar = document.createElement('button')

    // Adiciona atributos
    sectionOverlay.setAttribute('class', 'sectionOverlay')
    divOverlay.setAttribute('class', 'divOverlay')
    h3Titulo.setAttribute('class', 'h3Titulo')
    pConteudo.setAttribute('class', 'pConteudo')
    buttonVoltar.setAttribute('class', 'buttonVoltar')

    // adicionando valores
    h3Titulo.innerText = project.titulo
    pConteudo.innerHTML = `<b>Disciplina:</b> ${project.disciplina} <br><br>
    <b>Descricao:</b> ${project.descricao} <br><br>
    <b>Github</b> <a href="${project.gitHub}">${project.gitHub}</a>`
    buttonVoltar
    buttonVoltar.innerText = 'voltar'
    //adiciona a função do botão
    buttonVoltar.addEventListener('click', function(){
        sectionOverlay.remove()
    })

    // adiciona o conteudo ao html
    divOverlay.appendChild(h3Titulo)
    divOverlay.appendChild(pConteudo)
    divOverlay.appendChild(buttonVoltar)
    sectionOverlay.appendChild(divOverlay)
    document.body.appendChild(sectionOverlay)
}

window.addEventListener('load', function () {
    getProjectsForArray(JsonArray, createCardProject);
})