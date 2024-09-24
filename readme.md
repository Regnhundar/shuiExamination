# Solo-examination:

<br>

### **KURS:**

_"Utveckling & driftsättning i molnmiljö."_

<br>
<br>

### **KRAVSPECIFIKATION:**

https://github.com/fu-cloud-fe23/exam-aws-shui/tree/main

<br>
<br>

## **SETUP:**

<br>
<br>

> [!IMPORTANT]  
> **För att projektet ska fungera behöver du skapa en personal.yml och en .env-fil**

<br>
<br>

**I din backend-mapp: skapa en fil med namn:**

<br>

```
personal.yml
```

<br>

**I den behöver du två properties:**

<br>

```
org: dittOrganisationsNamn
role: arnAdressenTillDinRollSomHarLambdaOchDynamoDbAccess
```

<br>
<br>

**I din frontend-mapp skapa upp en .env-fil**

<br>

```
.env
```

<br>

**I den behöver du följande:**

<br>

```
VITE_API_BASE_URL=https://DINURL.execute-api.DINREGION.amazonaws.com
```

<br>

> [!WARNING]  
> **Byt ut mot din faktiska baseUrl som du får vid serverless deploy!**

<br>

## Kort API-Beskrivning:

<br>

Om det krävs information i request-body ska datan vara i JSON-format.

### GET MESSAGES

<br>

Hämta alla meddelanden:

```
GET - VITE_API_BASE_URL/messages
```

<br>

För att hämta specifik användares meddelanden lägg till en queryparam:

```
GET - VITE_API_BASE_URL/messages?username=ANVÄNDARNAMN
```

<br>

### POST MESSAGE

<br>

"username" och "text" måste med i request-body.

<br>

Exempel:

```
{
	"username" : "Nisse",
	"text" : "Hej och hå farbror blå."
}
```

```
POST - VITE_API_BASE_URL/messages
```

<br>

### DELETE MESSAGE

<br>

"sk" måste med i request-body.

<br>

Exempel:

```
{
	"sk" : "2024-09-22T21:22:16.780Z"
}
```

<br>

id är i det här fallet meddelandets pk property.

```
DELETE - VITE_API_BASE_URL/messages/{id}
```

<br>

### UPDATE MESSAGE

<br>

"sk" och "text" måste med i request-body.

<br>

Exempel:

```
{
	"sk" : "2024-09-22T21:22:16.780Z"
    "text" : "Hej och hå farbror blå."
}
```

<br>

id är i det här fallet meddelandets pk property.

```
PUT - VITE_API_BASE_URL/messages/{id}
```
