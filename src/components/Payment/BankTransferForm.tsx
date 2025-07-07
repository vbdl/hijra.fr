import React, { useState } from 'react';
import { Building2, Copy, CheckCircle, Clock } from 'lucide-react';
import Button from '../UI/Button';

interface BankTransferFormProps {
  amount: number;
  currency: string;
  orderReference: string;
  onConfirm: () => void;
}

const BankTransferForm: React.FC<BankTransferFormProps> = ({
  amount,
  currency,
  orderReference,
  onConfirm
}) => {
  const [copied, setCopied] = useState<string>('');

  const bankDetails = {
    bankName: 'Banque Européenne',
    iban: 'FR76 1234 5678 9012 3456 7890 123',
    bic: 'BEFRPP2X',
    accountHolder: 'Hijra.fr SARL',
    reference: orderReference
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Building2 className="h-6 w-6 text-gray-600" />
          <span className="font-medium text-gray-900">Virement bancaire SEPA</span>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-yellow-600 mr-2" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Délai de traitement : 1-3 jours ouvrables</p>
              <p>Votre commande sera traitée dès réception du virement.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Coordonnées bancaires :</h4>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Bénéficiaire</p>
                <p className="font-medium text-gray-900">{bankDetails.accountHolder}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.accountHolder, 'holder')}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                {copied === 'holder' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">IBAN</p>
                <p className="font-medium text-gray-900 font-mono">{bankDetails.iban}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                {copied === 'iban' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">BIC/SWIFT</p>
                <p className="font-medium text-gray-900 font-mono">{bankDetails.bic}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.bic, 'bic')}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                {copied === 'bic' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-brand-green bg-opacity-10 rounded-lg border border-brand-green">
              <div>
                <p className="text-sm text-brand-green-dark">Référence (OBLIGATOIRE)</p>
                <p className="font-bold text-brand-green font-mono">{bankDetails.reference}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.reference, 'reference')}
                className="p-2 text-brand-green hover:text-brand-green-dark"
              >
                {copied === 'reference' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Montant</p>
                <p className="font-bold text-gray-900 text-lg">{amount} {currency}</p>
              </div>
              <button
                onClick={() => copyToClipboard(`${amount}`, 'amount')}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                {copied === 'amount' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            <strong>Important :</strong> N'oubliez pas d'inclure la référence <strong>{bankDetails.reference}</strong> 
            dans le libellé de votre virement pour que nous puissions identifier votre paiement.
          </p>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={onConfirm}
        className="w-full"
      >
        J'ai effectué le virement
      </Button>
    </div>
  );
};

export default BankTransferForm;