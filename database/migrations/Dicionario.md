#Dicionario de Dados
USER{
id,
email,
password,
name,
lastname,
phone,
isVerified,
token,
token_created
}

ART{
id(HERDADO),
category,
uses

}
PRODUCT{
id,
name,
description,
price,
type,
published

}
ORDER{
id,
id_user(FK),
id_product(FK),
totalPrice,
observation,
status
}

PACKAGE{
id(HERDADO),
}
ORDER+PRODUCT{
id,
id_product(FK),
id_order(FK)
}
PACKAGE+ART{
id,
id_art(FK),
id_package(FK)
}

## USER HAS MANY ORDERS

## ORDER BELONGS TO USER

## ORDER HAS MANY PRODUCTS

## PRODUTCT BELONGS TO MANY ORDERS
