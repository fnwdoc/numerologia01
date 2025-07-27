class Numerologia {
    static calcularNumeroExpressao(nome) {
        const valores = {
            'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
            'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
            'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
        };

        let soma = 0;
        const nomeUpper = nome.toUpperCase().replace(/[^A-Z]/g, '');
        
        for (let letra of nomeUpper) {
            soma += valores[letra] || 0;
        }

        return this.reduzirNumero(soma);
    }

    static reduzirNumero(numero) {
        while (numero > 9 && numero !== 11 && numero !== 22 && numero !== 33) {
            let soma = 0;
            while (numero > 0) {
                soma += numero % 10;
                numero = Math.floor(numero / 10);
            }
            numero = soma;
        }
        return numero;
    }

    static obterSignificado(numero) {
        const significados = {
            1: "Liderança, independência, pioneirismo. Ideal para empresas inovadoras e startups.",
            2: "Cooperação, diplomacia, trabalho em equipe. Perfeito para parcerias e consultorias.",
            3: "Criatividade, comunicação, expressão. Excelente para empresas de marketing e arte.",
            4: "Estabilidade, organização, trabalho duro. Ideal para empresas de construção e finanças.",
            5: "Liberdade, aventura, mudança. Perfeito para empresas de viagem e tecnologia.",
            6: "Responsabilidade, cuidado, serviço. Excelente para empresas de saúde e educação.",
            7: "Espiritualidade, análise, pesquisa. Ideal para empresas de consultoria e pesquisa.",
            8: "Ambição, sucesso material, poder. Perfeito para grandes corporações e bancos.",
            9: "Humanitarismo, generosidade, conclusão. Excelente para ONGs e empresas sociais.",
            11: "Intuição, inspiração, iluminação. Ideal para empresas visionárias e espirituais.",
            22: "Construtor mestre, grandes realizações. Perfeito para grandes projetos e construções.",
            33: "Mestre professor, cura, compaixão. Excelente para empresas de cura e ensino."
        };

        return significados[numero] || "Número especial com energia única.";
    }

    static analisarNome(nome) {
        if (!nome || nome.trim().length === 0) {
            return null;
        }

        const nomeCompleto = nome.trim();
        const numeroExpressao = this.calcularNumeroExpressao(nomeCompleto);
        const analiseDetalhada = this.separarVogaisConsoantes(nomeCompleto);
        
        return {
            nome: nomeCompleto,
            numeroExpressao: numeroExpressao,
            numeroMotivacao: analiseDetalhada.numeroMotivacao,
            numeroImpressao: analiseDetalhada.numeroImpressao,
            primeiraLetra: analiseDetalhada.primeiraLetra,
            primeiraVogal: analiseDetalhada.primeiraVogal,
            significadoExpressao: this.obterSignificado(numeroExpressao),
            significadoMotivacao: this.obterSignificadoMotivacao(analiseDetalhada.numeroMotivacao),
            significadoImpressao: this.obterSignificadoImpressao(analiseDetalhada.numeroImpressao),
            energiaExpressao: this.obterEnergia(numeroExpressao),
            energiaMotivacao: this.obterEnergia(analiseDetalhada.numeroMotivacao),
            energiaImpressao: this.obterEnergia(analiseDetalhada.numeroImpressao),
            recomendacaoExpressao: this.obterRecomendacao(numeroExpressao),
            recomendacaoMotivacao: this.obterRecomendacaoMotivacao(analiseDetalhada.numeroMotivacao),
            recomendacaoImpressao: this.obterRecomendacaoImpressao(analiseDetalhada.numeroImpressao),
            analiseCompleta: this.gerarAnaliseCompleta(numeroExpressao, analiseDetalhada.numeroMotivacao, analiseDetalhada.numeroImpressao),
            numero: numeroExpressao,
            significado: this.obterSignificado(numeroExpressao),
            energia: this.obterEnergia(numeroExpressao),
            recomendacao: this.obterRecomendacao(numeroExpressao)
        };
    }

    static obterEnergia(numero) {
        const energias = {
            1: "Energia de liderança e iniciativa",
            2: "Energia de cooperação e harmonia",
            3: "Energia criativa e comunicativa",
            4: "Energia de estabilidade e organização",
            5: "Energia de liberdade e aventura",
            6: "Energia de cuidado e responsabilidade",
            7: "Energia espiritual e analítica",
            8: "Energia de poder e sucesso material",
            9: "Energia humanitária e universal",
            11: "Energia intuitiva e inspiradora",
            22: "Energia de grandes realizações",
            33: "Energia de cura e ensino"
        };

        return energias[numero] || "Energia especial";
    }

    static obterRecomendacao(numero) {
        const recomendacoes = {
            1: "Foque em inovação e seja pioneiro no seu segmento.",
            2: "Desenvolva parcerias sólidas e trabalhe em equipe.",
            3: "Invista em marketing criativo e comunicação eficaz.",
            4: "Construa uma base sólida e processos organizados.",
            5: "Mantenha-se flexível e aberto a mudanças.",
            6: "Priorize o atendimento ao cliente e responsabilidade social.",
            7: "Invista em pesquisa e desenvolvimento de expertise.",
            8: "Foque no crescimento e expansão dos negócios.",
            9: "Contribua para causas sociais e pense globalmente.",
            11: "Confie na sua intuição e inspire outros.",
            22: "Pense grande e realize projetos ambiciosos.",
            33: "Foque em curar e ensinar através do seu negócio."
        };

        return recomendacoes[numero] || "Siga sua intuição e propósito.";
    }

    static gerarSugestoes(numero) {
        const sugestoes = {
            1: ["Alpha", "Prime", "First", "Leader", "Pioneer"],
            2: ["Duo", "Partner", "Alliance", "Unity", "Harmony"],
            3: ["Creative", "Express", "Art", "Inspire", "Bright"],
            4: ["Solid", "Build", "Foundation", "Stable", "Secure"],
            5: ["Free", "Adventure", "Dynamic", "Change", "Move"],
            6: ["Care", "Service", "Family", "Home", "Nurture"],
            7: ["Wisdom", "Research", "Deep", "Mystic", "Insight"],
            8: ["Success", "Power", "Empire", "Gold", "Elite"],
            9: ["Global", "Universal", "World", "Complete", "Infinite"],
            11: ["Vision", "Intuitive", "Light", "Inspire", "Elevate"],
            22: ["Master", "Build", "Grand", "Mega", "Supreme"],
            33: ["Heal", "Teach", "Guide", "Compassion", "Wisdom"]
        };

        return sugestoes[numero] || ["Unique", "Special", "Original"];
    }

    static separarVogaisConsoantes(nome) {
        const vogais = 'AEIOU';
        const nomeUpper = nome.toUpperCase().replace(/[^A-Z]/g, '');
        
        let somaVogais = 0;
        let somaConsoantes = 0;
        let primeiraLetra = '';
        let primeiraVogal = '';
        
        const valores = {
            'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
            'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
            'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
        };
        
        for (let i = 0; i < nomeUpper.length; i++) {
            const letra = nomeUpper[i];
            const valor = valores[letra] || 0;
            
            if (i === 0) primeiraLetra = letra;
            
            if (vogais.includes(letra)) {
                somaVogais += valor;
                if (!primeiraVogal) primeiraVogal = letra;
            } else {
                somaConsoantes += valor;
            }
        }
        
        return {
            somaVogais,
            somaConsoantes,
            primeiraLetra,
            primeiraVogal,
            numeroMotivacao: this.reduzirNumero(somaVogais),
            numeroImpressao: this.reduzirNumero(somaConsoantes)
        };
    }

    static calcularNumeroMotivacao(nome) {
        const analise = this.separarVogaisConsoantes(nome);
        return analise.numeroMotivacao;
    }

    static calcularNumeroImpressao(nome) {
        const analise = this.separarVogaisConsoantes(nome);
        return analise.numeroImpressao;
    }

    static obterSignificadoMotivacao(numero) {
        const significados = {
            1: "Desejo de liderança e inovação. A empresa busca ser pioneira e referência no mercado.",
            2: "Motivação para parcerias e colaboração. Foco em trabalho em equipe e relacionamentos.",
            3: "Impulso criativo e comunicativo. Busca expressar-se e conectar-se com o público.",
            4: "Ambição por estabilidade e organização. Deseja construir bases sólidas e duradouras.",
            5: "Sede de liberdade e expansão. Motivada por mudanças e novas oportunidades.",
            6: "Vocação para servir e cuidar. Busca responsabilidade social e bem-estar.",
            7: "Busca por conhecimento e especialização. Motivada pela pesquisa e expertise.",
            8: "Ambição por sucesso material e reconhecimento. Foco em crescimento e poder.",
            9: "Motivação humanitária e universal. Deseja contribuir para causas maiores.",
            11: "Inspiração e visão elevada. Busca inspirar e elevar outros.",
            22: "Ambição por grandes realizações. Motivada por projetos transformadores.",
            33: "Vocação para ensinar e curar. Busca sabedoria e compaixão."
        };
        return significados[numero] || "Motivação especial e única.";
    }

    static obterSignificadoImpressao(numero) {
        const significados = {
            1: "Percebida como líder e inovadora. Transmite autoridade e pioneirismo.",
            2: "Vista como colaborativa e diplomática. Inspira confiança e parceria.",
            3: "Percebida como criativa e comunicativa. Transmite alegria e expressividade.",
            4: "Vista como confiável e organizada. Transmite estabilidade e eficiência.",
            5: "Percebida como dinâmica e versátil. Transmite energia e adaptabilidade.",
            6: "Vista como cuidadosa e responsável. Transmite harmonia e confiabilidade.",
            7: "Percebida como especializada e profunda. Transmite conhecimento e mistério.",
            8: "Vista como poderosa e bem-sucedida. Transmite autoridade e prosperidade.",
            9: "Percebida como humanitária e universal. Transmite generosidade e sabedoria.",
            11: "Vista como visionária e inspiradora. Transmite intuição e elevação.",
            22: "Percebida como grandiosa e transformadora. Transmite poder de realização.",
            33: "Vista como sábia e compassiva. Transmite cura e ensinamento."
        };
        return significados[numero] || "Impressão especial e marcante.";
    }

    static obterRecomendacaoMotivacao(numero) {
        const recomendacoes = {
            1: "Mantenha o foco na inovação e seja sempre o primeiro a implementar novas ideias.",
            2: "Cultive parcerias estratégicas e valorize o trabalho colaborativo.",
            3: "Invista pesadamente em comunicação criativa e expressão da marca.",
            4: "Construa processos sólidos e mantenha a organização como prioridade.",
            5: "Permaneça flexível e aberto a mudanças constantes no mercado.",
            6: "Priorize a responsabilidade social e o cuidado com stakeholders.",
            7: "Desenvolva expertise profunda e invista em pesquisa especializada.",
            8: "Foque no crescimento sustentável e na expansão estratégica.",
            9: "Integre propósitos humanitários aos objetivos comerciais.",
            11: "Confie na intuição empresarial e inspire através da visão.",
            22: "Pense em grande escala e realize projetos transformadores.",
            33: "Combine sabedoria com compaixão em todas as decisões."
        };
        return recomendacoes[numero] || "Siga sua motivação única e autêntica.";
    }

    static obterRecomendacaoImpressao(numero) {
        const recomendacoes = {
            1: "Mantenha uma imagem de liderança forte e pioneirismo no mercado.",
            2: "Cultive uma reputação de confiabilidade e espírito colaborativo.",
            3: "Projete criatividade e alegria em todas as comunicações públicas.",
            4: "Demonstre consistentemente organização e eficiência operacional.",
            5: "Mostre dinamismo e capacidade de adaptação às mudanças.",
            6: "Evidencie cuidado e responsabilidade em todas as interações.",
            7: "Posicione-se como especialista e referência em conhecimento.",
            8: "Projete sucesso e autoridade sem perder a humanidade.",
            9: "Demonstre generosidade e compromisso com causas maiores.",
            11: "Inspire através de visão elevada e intuição empresarial.",
            22: "Comunique grandiosidade e capacidade de grandes realizações.",
            33: "Transmita sabedoria e compaixão em todas as ações."
        };
        return recomendacoes[numero] || "Mantenha uma impressão autêntica e única.";
    }

    static gerarAnaliseCompleta(numeroExpressao, numeroMotivacao, numeroImpressao) {
        const combinacoes = {
            [`${numeroExpressao}-${numeroMotivacao}-${numeroImpressao}`]: `Combinação única que equilibra meios de atuação (${numeroExpressao}), motivações internas (${numeroMotivacao}) e percepção externa (${numeroImpressao}).`
        };

        let analise = "Esta empresa apresenta um perfil numerológico equilibrado. ";
        
        if (numeroExpressao === numeroMotivacao && numeroMotivacao === numeroImpressao) {
            analise += `Com todos os números iguais (${numeroExpressao}), há uma forte coerência entre o que a empresa é, o que busca e como é vista. Isso indica autenticidade e alinhamento total.`;
        } else if (numeroExpressao === numeroMotivacao) {
            analise += `A harmonia entre Expressão e Motivação (${numeroExpressao}) indica que os meios de atuação estão alinhados com os desejos internos da empresa.`;
        } else if (numeroExpressao === numeroImpressao) {
            analise += `A sintonia entre Expressão e Impressão (${numeroExpressao}) mostra que a forma de atuar está alinhada com a percepção pública.`;
        } else if (numeroMotivacao === numeroImpressao) {
            analise += `O alinhamento entre Motivação e Impressão (${numeroMotivacao}) revela que os desejos internos são bem percebidos pelo público.`;
        } else {
            analise += `A diversidade de números (${numeroExpressao}, ${numeroMotivacao}, ${numeroImpressao}) indica uma empresa multifacetada com diferentes aspectos bem desenvolvidos.`;
        }

        return analise;
    }
}

window.Numerologia = Numerologia;
