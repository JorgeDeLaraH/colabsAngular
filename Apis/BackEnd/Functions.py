from bson import ObjectId,json_util as j
from flask import jsonify
from pymongo import MongoClient
import BackEnd.GlobalInfo.ResponseMessages as ResponseMessage
import BackEnd.GlobalInfo.Keys as ColabsKey

#Conexion a la base de datos
if ColabsKey.dbconn==None:
    mongoConnect=MongoClient(ColabsKey.strConnection)
    ColabsKey.dbconn=mongoConnect[ColabsKey.strDBConnection]
    dbColabs=ColabsKey.dbconn["clColabs"]
#Esta funcion trae todos los datos de clColabs formateados
def fnGetColabs():
    try:
        arrFinalColab=[]
        objQuery=dbColabs.find({})
        listColabs=list(objQuery)
        if len(listColabs)!=0:
            for objColab in listColabs:
                print(objColab)
                objFormateado={
                    "_id":str(objColab['_id']),
                    "strName":objColab["strName"],
                    "strLastName":objColab['strLastName'],
                    "strRole":objColab['strRole'],
                    "arraExperience":objColab['arrExperience']
                }
                arrFinalColab.append(objFormateado)
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Respuesta']=arrFinalColab
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fngetcolabs",e)
        return jsonify(ResponseMessage.err500)
#Usamos el id como identificador para traer un solo colaborador
def fnGetColab(id):
    try:
        arrFinalColabs=[]
        objQuery=dbColabs.find({"_id":ObjectId(id)})
        listColabs=list(objQuery)
        if len(listColabs)!=0:
            for objColabs in listColabs:
                print(objColabs)
                objFormateado={
                    "_id":str(objColabs['_id']),
                    "strName":objColabs["strName"],
                    "strLastName":objColabs['strLastName'],
                    "strRole":objColabs['strRole'],
                    "arraExperience":objColabs['arrExperience']
                }
                arrFinalColabs.append(objFormateado)
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Respuesta']=arrFinalColabs
        return jsonify(objResponse)
    except Exception as e:
        print("Error",e)
        return jsonify(ResponseMessage.err500)
#Esta funcion trae los parametros en directions con el request y realizamos la consulta de mongo
def fnPostColabs(id,skill,level,numYear):
    try:
        print("Datos a guardar",id,skill,level,numYear)
        dbColabs.update_one({"_id":ObjectId(id)},{"$addToSet":{"arrExperience":{"strSkillName":skill,"strLevel":level,"numYearsExp":numYear}}})
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Informacion_Guardad']=True
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnPostPersona",e)
        return jsonify(ResponseMessage.err500)
#Igual que el anterior
def fnPutColabs(id,skillf,skilln,level,numYear):
    try:
        print("Los datos que voy a actualizar son: ",skilln,level,numYear)
        dbColabs.update_one({"_id":ObjectId(id),"arrExperience.strSkillName":skillf},{"$set":{"arrExperience.$.strSkillName":skilln,"arrExperience.$.strLevel":level,"arrExperience.$.numYearsExp":numYear}})
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Informacion_Actualizada']=True
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnPostPersona",e)
        return jsonify(ResponseMessage.err500)
#Método para borrar mediante id y campo del array incolucrado
def fnDeleteColabs(id,skill):
    try:
        print("Los datos que eliminare: ",id,skill)
        dbColabs.update_one({"_id":ObjectId(id)},{"$pull":{"arrExperience":{"strSkillName":skill}}})
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Informacion_Borrada']=True
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fnPostPersona",e)
        return jsonify(ResponseMessage.err500)