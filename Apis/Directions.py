#Importacion de librerías
from flask import Flask,jsonify,request
from flask_cors import CORS
import BackEnd.Functions as CallMethod
import BackEnd.GlobalInfo.ResponseMessages as ResponseMessage

#Instancia
app=Flask(__name__)
CORS(app)

#Definición de rutas
@app.route('/colabs', methods=['GET'])
def getColabs():
    try:
        objResult=CallMethod.fnGetColabs()
        return objResult
    except Exception as e:
        print("Error en getColabs",e)
        return jsonify(ResponseMessage.err500)
    
@app.route('/colabs/<id>', methods=['GET'])
def getColab(id):
    try:
        objResult=CallMethod.fnGetColab(id)
        return objResult
    except Exception as e:
        print("Error en getColab",e)
        return jsonify(ResponseMessage.err500)
    
@app.route('/colabs', methods=['POST'])
def postColabs():
    try:
        id=None if("id" not in request.json) else request.json['id']
        skill=None if("skill" not in request.json) else request.json['skill']
        level=request.json['level']
        numYear=request.json['numYear']
        if id==None or skill==None:
            return jsonify(ResponseMessage.err203)
        else:
            objResult=CallMethod.fnPostColabs(id,skill,level,numYear)
            return objResult
    except  Exception as e:
        print("Error en postColabs",e)
        return jsonify(ResponseMessage.err500)
    
@app.route('/colabs', methods=['PUT'])
def putColabs():
    try:
        id=None if("id" not in request.json) else request.json['id']
        skillf=None if("skillf" not in request.json) else request.json['skillf']
        skilln=None if("skilln" not in request.json) else request.json['skilln']
        level=request.json['level']
        numYear=request.json['numYear']
        if id==None or skilln==None:
            return jsonify(ResponseMessage.err203)
        else:
            objResult=CallMethod.fnPutColabs(id,skillf,skilln,level,numYear)
            return objResult
    except  Exception as e:
        print("Error en putColabs",e)
        return jsonify(ResponseMessage.err500)

@app.route('/colabs', methods=['DELETE'])
def deleteColabs():
    try:
        id=None if("id" not in request.json) else request.json['id']
        skill=None if("skill" not in request.json) else request.json['skill']
        if id==None or skill==None:
            return jsonify(ResponseMessage.err203)
        else:
            objResult=CallMethod.fnDeleteColabs(id,skill)
            return objResult
    except Exception as e:
        print("Error en deleteColabs",e)
        return jsonify(ResponseMessage.err500)
if __name__=='__main__':
    app.run(host="0.0.0.0", port=9005, debug=True, threaded=True)