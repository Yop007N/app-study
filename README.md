# 📚 App Study - Plataforma de Gestión de Contenidos Académicos

> **Aplicación para organización y seguimiento de contenidos de estudio académico con arquitectura escalable**

## 📋 Descripción

App Study es una plataforma robusta desarrollada en Node.js para la gestión y organización de contenidos académicos. Implementa Clean Architecture con separación de responsabilidades, permitiendo a estudiantes y educadores organizar materias, contenidos por tópicos y realizar seguimiento del progreso académico de manera eficiente.

## ⭐ Características Principales

### 🎯 Funcionalidades Core
- **👥 Gestión de Usuarios:** Sistema completo de registro, autenticación y perfiles
- **📖 Organización por Semestres:** Estructura jerárquica para organizar el contenido académico
- **📚 Gestión de Materias:** CRUD completo para materias con metadatos detallados
- **🎯 Contenidos por Tópicos:** Organización granular de contenidos de estudio
- **📊 Seguimiento de Progreso:** Métricas y analytics del avance académico
- **🔍 Sistema de Búsqueda:** Búsqueda avanzada de contenidos y materias

### 🏗️ Características Técnicas
- **🎯 Clean Architecture:** Separación en capas Domain, Application, Infrastructure y Presentation
- **🔒 Autenticación JWT:** Sistema seguro de autenticación y autorización
- **📊 ORM Sequelize:** Integración robusta con PostgreSQL
- **🛡️ Validación de Datos:** Validaciones de entrada y sanitización
- **📈 Health Monitoring:** Sistema de monitoreo de salud de la aplicación
- **🔄 Middleware Personalizado:** Pipeline de procesamiento de requests

## 💻 Stack Tecnológico

### Backend Core
- **Node.js 18+** - Runtime de JavaScript de alto rendimiento
- **Express.js 4.18.2** - Framework web minimalista y flexible
- **TypeScript 5+** - Tipado estático para desarrollo escalable
- **PostgreSQL 14+** - Base de datos relacional robusta

### ORM y Base de Datos
- **Sequelize 6.35.2** - ORM avanzado para Node.js
- **pg 8.11.3** - Driver nativo de PostgreSQL
- **pg-hstore 2.3.4** - Soporte para tipos hstore de PostgreSQL

### Autenticación y Seguridad
- **jsonwebtoken 9.0.2** - Implementación de JWT para Node.js
- **bcryptjs 2.4.3** - Hashing seguro de contraseñas
- **cors 2.8.5** - Configuración de políticas CORS
- **helmet** - Headers de seguridad HTTP

### Herramientas de Desarrollo
- **nodemon 3.0.2** - Auto-reload durante desarrollo
- **dotenv 16.3.1** - Gestión de variables de entorno
- **morgan** - Logger de HTTP requests
- **joi** - Validación de esquemas de datos

## 🚀 Instalación

### Prerrequisitos

- **Node.js 18+** y npm
- **PostgreSQL 14+** instalado y configurado
- **Git** para control de versiones

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Yop007N/app-study.git
cd app-study

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu configuración

# 4. Configurar base de datos
createdb app_study_db

# 5. Ejecutar migraciones
npm run db:migrate

# 6. Semillas de datos (opcional)
npm run db:seed

# 7. Iniciar en desarrollo
npm run dev
```

## ⚙️ Configuración

### Variables de Entorno

```bash
# .env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Base de datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=app_study_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DIALECT=postgres

# Configuración JWT
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Configuración de logs
LOG_LEVEL=info
LOG_FORMAT=combined

# Configuración de CORS
CORS_ORIGIN=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Configuración de la aplicación
APP_NAME=App Study
APP_VERSION=1.0.0
APP_DESCRIPTION=Plataforma de Gestión de Contenidos Académicos
```

### Configuración de Base de Datos

```javascript
// config/database.js
const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: console.log,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 20,
      min: 5,
      acquire: 60000,
      idle: 20000
    }
  }
};
```

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
app-study/
├── src/
│   ├── domain/                 # Capa de Dominio
│   │   ├── entities/          # Entidades de negocio
│   │   ├── value-objects/     # Objetos de valor
│   │   └── repositories/      # Interfaces de repositorios
│   ├── application/           # Capa de Aplicación
│   │   ├── use-cases/        # Casos de uso
│   │   ├── dtos/             # Objetos de transferencia de datos
│   │   └── services/         # Servicios de aplicación
│   ├── infrastructure/        # Capa de Infraestructura
│   │   ├── database/         # Configuración de base de datos
│   │   ├── repositories/     # Implementaciones de repositorios
│   │   ├── models/           # Modelos de Sequelize
│   │   └── config/           # Configuraciones
│   └── presentation/          # Capa de Presentación
│       ├── controllers/      # Controladores REST
│       ├── middleware/       # Middleware personalizado
│       ├── routes/           # Definición de rutas
│       └── validators/       # Validadores de entrada
├── migrations/               # Migraciones de base de datos
├── seeders/                 # Datos de semilla
├── tests/                   # Pruebas unitarias e integración
├── docs/                    # Documentación técnica
└── package.json
```

### Clean Architecture Implementada

#### Capa de Dominio
```javascript
// src/domain/entities/User.js
class User {
  constructor(id, username, email, firstName, lastName, createdAt) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  isActive() {
    return this.status === 'active';
  }
}
```

#### Capa de Aplicación
```javascript
// src/application/use-cases/CreateUserUseCase.js
class CreateUserUseCase {
  constructor(userRepository, passwordHasher) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute(userData) {
    // Validar datos de entrada
    const validation = this.validateUserData(userData);
    if (!validation.isValid) {
      throw new ValidationError(validation.errors);
    }

    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictError('El usuario ya existe');
    }

    // Hash de la contraseña
    const hashedPassword = await this.passwordHasher.hash(userData.password);

    // Crear usuario
    const user = new User({
      ...userData,
      password: hashedPassword
    });

    return await this.userRepository.save(user);
  }
}
```

#### Capa de Infraestructura
```javascript
// src/infrastructure/repositories/SequelizeUserRepository.js
class SequelizeUserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async save(user) {
    const savedUser = await this.userModel.create(user);
    return this.toDomain(savedUser);
  }

  async findById(id) {
    const user = await this.userModel.findByPk(id);
    return user ? this.toDomain(user) : null;
  }

  async findByEmail(email) {
    const user = await this.userModel.findOne({ where: { email } });
    return user ? this.toDomain(user) : null;
  }

  toDomain(userModel) {
    return new User(
      userModel.id,
      userModel.username,
      userModel.email,
      userModel.firstName,
      userModel.lastName,
      userModel.createdAt
    );
  }
}
```

## 📡 API Endpoints

### Autenticación
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "estudiante123",
  "email": "estudiante@example.com",
  "password": "SecurePass123!",
  "firstName": "Juan",
  "lastName": "Pérez"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "estudiante123",
      "email": "estudiante@example.com",
      "firstName": "Juan",
      "lastName": "Pérez"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Gestión de Materias
```http
GET /api/subjects
Authorization: Bearer your-jwt-token

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Matemáticas Avanzadas",
      "code": "MAT301",
      "credits": 4,
      "semester": "2024-1",
      "description": "Cálculo diferencial e integral avanzado",
      "difficulty": "high",
      "topics": [
        {
          "id": 1,
          "title": "Límites y Continuidad",
          "description": "Conceptos fundamentales de límites",
          "order": 1
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### Contenidos por Tópicos
```http
POST /api/topics
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "title": "Derivadas Parciales",
  "description": "Introducción a las derivadas parciales y sus aplicaciones",
  "subjectId": 1,
  "order": 3,
  "difficulty": "medium",
  "estimatedHours": 8
}

Response:
{
  "success": true,
  "data": {
    "id": 15,
    "title": "Derivadas Parciales",
    "description": "Introducción a las derivadas parciales y sus aplicaciones",
    "subjectId": 1,
    "order": 3,
    "difficulty": "medium",
    "estimatedHours": 8,
    "createdAt": "2024-12-20T10:30:00Z"
  }
}
```

## 📊 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor en modo desarrollo
npm start               # Inicia servidor en modo producción

# Base de datos
npm run db:migrate      # Ejecuta migraciones pendientes
npm run db:migrate:undo # Revierte última migración
npm run db:seed         # Ejecuta seeders
npm run db:reset        # Resetea base de datos completa

# Testing
npm test               # Ejecuta suite de pruebas
npm run test:unit      # Pruebas unitarias
npm run test:integration # Pruebas de integración
npm run test:coverage  # Cobertura de pruebas

# Linting y formato
npm run lint           # Ejecuta ESLint
npm run lint:fix       # Corrige problemas de linting
npm run format         # Formatea código con Prettier

# Utilidades
npm run health         # Verifica salud de la aplicación
npm run docs           # Genera documentación API
```

## 🏗️ Modelos de Base de Datos

### Modelo de Usuario
```javascript
// src/infrastructure/models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
        isAlphanumeric: true
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'active'
    }
  }, {
    tableName: 'users',
    timestamps: true,
    indexes: [
      { fields: ['email'] },
      { fields: ['username'] },
      { fields: ['status'] }
    ]
  });

  User.associate = (models) => {
    User.hasMany(models.Subject, { foreignKey: 'userId', as: 'subjects' });
    User.hasMany(models.Progress, { foreignKey: 'userId', as: 'progress' });
  };

  return User;
};
```

### Modelo de Materia
```javascript
// src/infrastructure/models/Subject.js
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 100]
      }
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20]
      }
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 8
      }
    },
    semester: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    difficulty: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'subjects',
    timestamps: true,
    indexes: [
      { fields: ['code'] },
      { fields: ['userId'] },
      { fields: ['semester'] },
      { fields: ['difficulty'] }
    ]
  });

  Subject.associate = (models) => {
    Subject.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Subject.hasMany(models.Topic, { foreignKey: 'subjectId', as: 'topics' });
  };

  return Subject;
};
```

## 🔒 Seguridad

### Middleware de Autenticación
```javascript
// src/presentation/middleware/auth.js
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('../../../domain/errors');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new AuthenticationError('Token de acceso requerido');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
    next(error);
  }
};
```

### Validación de Datos
```javascript
// src/presentation/validators/userValidator.js
const Joi = require('joi');

const createUserSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.alphanum': 'El username solo puede contener caracteres alfanuméricos',
      'string.min': 'El username debe tener al menos 3 caracteres',
      'string.max': 'El username no puede exceder 50 caracteres'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Debe proporcionar un email válido'
    }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'))
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 8 caracteres',
      'string.pattern.base': 'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un símbolo'
    }),
  firstName: Joi.string()
    .min(2)
    .max(50)
    .required(),
  lastName: Joi.string()
    .min(2)
    .max(50)
    .required()
});
```

## 📈 Monitoreo y Health Checks

### Health Check Endpoint
```javascript
// src/presentation/controllers/HealthController.js
class HealthController {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async checkHealth(req, res) {
    try {
      const healthData = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: process.env.APP_NAME,
        version: process.env.APP_VERSION,
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        checks: {}
      };

      // Verificar conexión a base de datos
      try {
        await this.dbConnection.authenticate();
        healthData.checks.database = {
          status: 'healthy',
          message: 'Conexión establecida correctamente'
        };
      } catch (error) {
        healthData.checks.database = {
          status: 'unhealthy',
          message: error.message
        };
        healthData.status = 'unhealthy';
      }

      // Verificar memoria
      const memoryUsage = process.memoryUsage();
      healthData.checks.memory = {
        status: memoryUsage.heapUsed < 100 * 1024 * 1024 ? 'healthy' : 'warning',
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`
      };

      const statusCode = healthData.status === 'healthy' ? 200 : 503;
      res.status(statusCode).json(healthData);
    } catch (error) {
      res.status(503).json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message
      });
    }
  }
}
```

## 🌐 Despliegue

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: app_study_db
      POSTGRES_USER: app_user
      POSTGRES_PASSWORD: secure_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Heroku Deployment
```bash
# Preparar para Heroku
echo "web: npm start" > Procfile

# Configurar variables de entorno
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-production-jwt-secret
heroku config:set DATABASE_URL=postgres://user:pass@host:port/db

# Deploy
git push heroku main

# Ejecutar migraciones
heroku run npm run db:migrate
```

## 📊 Performance y Métricas

### Métricas de Rendimiento Objetivo

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| **Response Time** | < 200ms | 150ms |
| **Throughput** | > 500 req/s | 650 req/s |
| **Database Query Time** | < 50ms | 35ms |
| **Memory Usage** | < 512MB | 380MB |
| **CPU Usage** | < 70% | 45% |

### Logging y Monitoring
```javascript
// src/infrastructure/logger/Logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: process.env.APP_NAME,
    version: process.env.APP_VERSION
  },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});
```

## 🧪 Testing

### Estructura de Pruebas
```javascript
// tests/unit/use-cases/CreateUserUseCase.test.js
const { CreateUserUseCase } = require('../../../src/application/use-cases');
const { UserRepository } = require('../../../src/domain/repositories');
const { PasswordHasher } = require('../../../src/infrastructure/security');

describe('CreateUserUseCase', () => {
  let createUserUseCase;
  let mockUserRepository;
  let mockPasswordHasher;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      save: jest.fn()
    };
    mockPasswordHasher = {
      hash: jest.fn()
    };
    createUserUseCase = new CreateUserUseCase(mockUserRepository, mockPasswordHasher);
  });

  test('debe crear un usuario exitosamente', async () => {
    // Arrange
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'SecurePass123!',
      firstName: 'Test',
      lastName: 'User'
    };

    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockPasswordHasher.hash.mockResolvedValue('hashed_password');
    mockUserRepository.save.mockResolvedValue({ id: 1, ...userData });

    // Act
    const result = await createUserUseCase.execute(userData);

    // Assert
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(mockPasswordHasher.hash).toHaveBeenCalledWith(userData.password);
    expect(result).toBeDefined();
    expect(result.email).toBe(userData.email);
  });
});
```

## 👨‍💻 Autor

**Enrique Bobadilla**

---

**Versión:** 1.0.0
**Última actualización:** Diciembre 2024