import { MarketPair } from './types';

export const TRADING_PAIRS: MarketPair[] = [
  // High Volatility (Green > 90%)
  { name: 'EUR/USD', volatility: '96%' },
  { name: 'GBP/USD', volatility: '95%' },
  { name: 'XAU/USD', volatility: '94%' },
  { name: 'BTC/USD', volatility: '93%' },
  { name: 'ETH/USD', volatility: '92%' },
  { name: 'USD/JPY', volatility: '91%' },
  { name: 'USD/BRL', volatility: '91%' },
  
  // Medium Volatility (Yellow 80-89%)
  { name: 'AUD/CAD', volatility: '89%' },
  { name: 'USD/CAD', volatility: '88%' },
  { name: 'EUR/JPY', volatility: '87%' },
  { name: 'GBP/JPY', volatility: '86%' },
  { name: 'NZD/USD', volatility: '85%' },
  { name: 'AUD/USD', volatility: '84%' },
  { name: 'USD/CHF', volatility: '82%' },
  { name: 'US 30', volatility: '81%' },

  // Low Volatility (Red < 80%)
  { name: 'EUR/GBP', volatility: '79%' },
  { name: 'EUR/AUD', volatility: '78%' },
  { name: 'CAD/JPY', volatility: '76%' },
  { name: 'GBP/CHF', volatility: '75%' },
  { name: 'NZD/JPY', volatility: '74%' },
  { name: 'CHF/JPY', volatility: '70%' },
];

export const GEO_CONFIG = {
  pt: {
    names: [
      "Carlos S.", "Mariana O.", "Felipe M.", "Ana P.", "João D.", 
      "Lucas R.", "Beatriz L.", "Gustavo H.", "Rafael C.", "Juliana T."
    ],
    currency: "R$"
  },
  en: {
    names: [
      "Michael B.", "Sarah J.", "James W.", "Emily R.", "David K.", 
      "Jessica M.", "Robert P.", "Jennifer L.", "William T.", "Elizabeth H."
    ],
    currency: "$"
  },
  es: {
    names: [
      "Alejandro G.", "Sofía M.", "Diego R.", "Valentina C.", "Mateo L.", 
      "Camila P.", "Santiago F.", "Isabella D.", "Nicolás B.", "Lucía T."
    ],
    currency: "$"
  },
  fr: {
    names: [
      "Pierre L.", "Camille D.", "Lucas M.", "Léa B.", "Thomas R.", 
      "Chloé P.", "Nicolas F.", "Manon G.", "Alexandre V.", "Sarah C."
    ],
    currency: "€"
  }
};

export const ANALYSIS_LOGS = {
  pt: [
    "Iniciando protocolo de conexão segura...",
    "Acessando datafeed global (Bloomberg/Reuters)...",
    "Analisando Índice de Força Relativa (RSI)...",
    "Verificando Bandas de Bollinger...",
    "Calculando volatilidade de mercado...",
    "Detectando padrões de velas...",
    "Rede Neural: Confirmando tendência...",
    "Gerando sinal de alta precisão..."
  ],
  en: [
    "Starting secure connection protocol...",
    "Accessing global datafeed...",
    "Analyzing Relative Strength Index (RSI)...",
    "Checking Bollinger Bands...",
    "Calculating market volatility...",
    "Detecting candlestick patterns...",
    "Neural Network: Confirming trend...",
    "Generating high precision signal..."
  ],
  es: [
    "Iniciando protocolo de conexión segura...",
    "Accediendo al datafeed global...",
    "Analizando Índice de Fuerza Relativa (RSI)...",
    "Verificando Bandas de Bollinger...",
    "Calculando volatilidad del mercado...",
    "Detectando patrones de velas...",
    "Red Neuronal: Confirmando tendencia...",
    "Generando señal de alta precisión..."
  ],
  fr: [
    "Démarrage du protocole sécurisé...",
    "Accès au flux de données mondial...",
    "Analyse de l'Indice de Force Relative (RSI)...",
    "Vérification des Bandes de Bollinger...",
    "Calcul de la volatilité du marché...",
    "Détection des modèles de chandeliers...",
    "Réseau Neuronal : Confirmation de tendance...",
    "Génération du signal de haute précision..."
  ]
};

export const TRANSLATIONS = {
  pt: {
    appTitle: "POCKET",
    appSubtitle: "Scanner Pro v2.4",
    statusOnline: "ONLINE",
    statusIdle: "AGUARDANDO",
    statusScanning: "ESCANEAR",
    loginTitle: "Acesso Restrito",
    loginPlaceholder: "INSIRA SEU USER ID",
    loginBtn: "Entrar no Sistema",
    loginChecking: "Verificando...",
    loginSuccess: "Acesso Autorizado",
    ctaStart: "ESCANEAR OPORTUNIDADE",
    ctaScanning: "ANALISANDO...",
    signalBuy: "COMPRA",
    signalSell: "VENDA",
    signalCall: "ACIMA / CALL",
    signalPut: "ABAIXO / PUT",
    labelAsset: "ATIVO",
    labelExpiration: "EXPIRAÇÃO",
    labelAccuracy: "ASSERTIVIDADE IA",
    btnNewScan: "Realizar nova análise",
    riskWarning: "AVISO DE RISCO: A negociação envolve riscos significativos. Ferramenta auxiliar.",
    scannerWait: "SISTEMA PRONTO. SELECIONE O ATIVO.",
    scannerActive: "VARREDURA EM ANDAMENTO",
    selectAsset: "SELECIONE O ATIVO:",
    timerLabel: "SINAL EXPIRA EM:",
    profitLabel: "lucrou",
    seconds: "s"
  },
  en: {
    appTitle: "POCKET",
    appSubtitle: "Scanner Pro v2.4",
    statusOnline: "ONLINE",
    statusIdle: "IDLE",
    statusScanning: "SCANNING",
    loginTitle: "Restricted Access",
    loginPlaceholder: "ENTER USER ID",
    loginBtn: "Access System",
    loginChecking: "Verifying...",
    loginSuccess: "Access Granted",
    ctaStart: "SCAN OPPORTUNITY",
    ctaScanning: "ANALYZING...",
    signalBuy: "BUY",
    signalSell: "SELL",
    signalCall: "HIGHER / CALL",
    signalPut: "LOWER / PUT",
    labelAsset: "ASSET",
    labelExpiration: "EXPIRATION",
    labelAccuracy: "AI ACCURACY",
    btnNewScan: "Run new analysis",
    riskWarning: "RISK WARNING: Trading involves significant risk. This is an auxiliary tool.",
    scannerWait: "SYSTEM READY. SELECT ASSET.",
    scannerActive: "MARKET SCAN IN PROGRESS",
    selectAsset: "SELECT ASSET:",
    timerLabel: "SIGNAL EXPIRES IN:",
    profitLabel: "profited",
    seconds: "s"
  },
  es: {
    appTitle: "POCKET",
    appSubtitle: "Escáner Pro v2.4",
    statusOnline: "EN LÍNEA",
    statusIdle: "ESPERA",
    statusScanning: "ESCANEAR",
    loginTitle: "Acceso Restringido",
    loginPlaceholder: "INGRESAR ID DE USUARIO",
    loginBtn: "Entrar al Sistema",
    loginChecking: "Verificando...",
    loginSuccess: "Acceso Autorizado",
    ctaStart: "ESCANEAR OPORTUNIDAD",
    ctaScanning: "ANALIZANDO...",
    signalBuy: "COMPRA",
    signalSell: "VENTA",
    signalCall: "ARRIBA / CALL",
    signalPut: "ABAJO / PUT",
    labelAsset: "ACTIVO",
    labelExpiration: "EXPIRACIÓN",
    labelAccuracy: "PRECISIÓN IA",
    btnNewScan: "Realizar nuevo análisis",
    riskWarning: "ADVERTENCIA DE RIESGO: El trading implica riesgos. Herramienta auxiliar.",
    scannerWait: "SISTEMA LISTO. SELECCIONE ACTIVO.",
    scannerActive: "ESCANEO DE MERCADO EN PROGRESO",
    selectAsset: "SELECCIONAR ACTIVO:",
    timerLabel: "SEÑAL EXPIRA EN:",
    profitLabel: "ganó",
    seconds: "s"
  },
  fr: {
    appTitle: "POCKET",
    appSubtitle: "Scanner Pro v2.4",
    statusOnline: "EN LIGNE",
    statusIdle: "ATTENTE",
    statusScanning: "SCAN",
    loginTitle: "Accès Restreint",
    loginPlaceholder: "ENTREZ ID UTILISATEUR",
    loginBtn: "Accéder au Système",
    loginChecking: "Vérification...",
    loginSuccess: "Accès Autorisé",
    ctaStart: "SCANNER OPPORTUNITÉ",
    ctaScanning: "ANALYSE...",
    signalBuy: "ACHAT",
    signalSell: "VENTE",
    signalCall: "HAUT / CALL",
    signalPut: "BAS / PUT",
    labelAsset: "ACTIF",
    labelExpiration: "EXPIRATION",
    labelAccuracy: "PRÉCISION IA",
    btnNewScan: "Nouvelle analyse",
    riskWarning: "AVERTISSEMENT: Le trading comporte des risques. Outil d'aide à la décision.",
    scannerWait: "SYSTÈME PRÊT. SÉLECTIONNEZ L'ACTIF.",
    scannerActive: "SCAN DU MARCHÉ EN COURS",
    selectAsset: "SÉLECTIONNER ACTIF:",
    timerLabel: "LE SIGNAL EXPIRE DANS :",
    profitLabel: "a gagné",
    seconds: "s"
  }
};